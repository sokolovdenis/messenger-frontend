import React, { Component } from 'react';

export class Login extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6 mx-auto my-auto">
                    <div className="card">
                        <article className="card-body">
                            <a href="123" className="float-right btn btn-outline-primary">Sign
                                up</a>
                            <h4 className="card-title mb-4 mt-1">Sign in</h4>
                            <form method="POST">
                                <div className="form-group">
                                    <label>Your username</label>
                                    <input type="text" class="form-control" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <label>Your password</label>
                                    <input type="text" className="form-control" placeholder="********"/>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Login</button>
                                </div>

                            </form>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}
