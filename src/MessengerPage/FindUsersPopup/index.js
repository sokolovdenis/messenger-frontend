import React from 'react';
import { HttpRequestFIndUsers } from '../../HttpRequest'

class FindUsersPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      findUsers: []
    }

    this.handleChangeTest = this.handleChangeTest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findUsers = this.findUsers.bind(this);

  }

  handleChangeTest(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    /*this.props.onSubmit(this.state.text);*/
    if (this.state.text.length > 0) {
      this.findUsers();
    }
    else {
      let notFoundUser = [
        {
          id: null,
          name: 'Пожалуйста, введите текст'
        }]
      this.setState({ findUsers: notFoundUser })
    }
  }

  findUsers() {
    HttpRequestFIndUsers(this.state.text, this.props.token)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else {
          throw response;
        }
      })
      .then((data) => {
        if (data.length > 0) {

          /* Сортировка по имени, как при поиске комверсий */
          data.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.setState({ findUsers: data })
        } else {
          let notFoundUser = [
            {
              id: null,
              name: 'Пользователи не найдены'
            }]
          this.setState({ findUsers: notFoundUser })
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          let notFoundUser = [
            {
              id: null,
              name: 'Пользователи не найдены'
            }]
          this.setState({ findUsers: notFoundUser })
        }
        else {
          console.log(error);
          alert('При получении данных о контактах произошла ошибка!');
        }
      });
  }
  render() {
    console.log(this.state.findUsers);
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>Поиск</h1>
          <form className="popupFindButtonForm" onSubmit={this.handleSubmit}>
            <input id="password"
              name="password"
              placeholder="Имя или логин"
              className="inputText"
              value={this.state.text}
              onChange={this.handleChangeTest} />
            <input id="submitButton" type="submit" value="Найти" />
          </form>
          <hr></hr>
          <ul className="listFindResult"> 
            { /* item.id, item.name */
              this.state.findUsers.map(item => (
                item.id ?
                  <li className="link-button"
                    key={item.id}
                    name={item.name}
                    onClick={() => this.props.userInFindClickHandle(item.id, item.name)}>
                    {item.name} ({item.id})
              </li> :
                  <li key={item.id}>
                    {item.name}
                  </li>
              )
              )
            }
          </ul>
          <button className='popupCloseButton' onClick={this.props.closePopup}>Закрыть</button>
        </div>
      </div>
    );
  }
}

export default FindUsersPopup;