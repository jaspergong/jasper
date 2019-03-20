/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Checkbox, Grid, Message, Icon } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import IceIcon from '@icedesign/icon';

import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import { userLogin } from './actions';
import reducer from './reducer';
import './UserLogin.scss';

const { Row, Col } = Grid;
// 寻找背景图片可以从 https://unsplash.com/ 寻找
const backgroundImage = require('./images/TB1zsNhXTtYBeNjy1XdXXXXyVXa-2252-1500.png');
class UserLogin extends Component {
  static displayName = 'UserLogin';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        username: '',
        password: '',
        checkbox: false,
      },
    };
  }

  formChange = (value) => {
    this.setState({
      value,
    });
  };

  handleSubmit = (e) => {
    // e.preventDefault();
    this.refs.form.validateAll((errors, values) => {
      if (errors) {
        return;
      }
      console.log(values,'val');
      this.props.userLogin(values);
    });
  };
  //登录验证逻辑
  loginIt = () => {
    Tools.clear();
    this.loginService.login({
      userName: this.state.value.username,
      password: Tools.hexMd5(`${this.state.value.password}salt`),
      code: this.state.value.code,
      token: this.state.token,
    })
        .then((res) => {
          if (res) {
            Tools.setToken(res.token);
            Tools.setUser(res.shiroUser);
            if (res.state === '-1') {
              Msg.alert('该账号是默认密码，为了安全请进行修改后使用', () => {
                this.props.history.push('/changeDefaultPwd');
              });
            } else {
              this.props.history.push('/dashboard');
            }
          } else {
            this.refreshCode();
          }
        });
  };

  render() {
    return (
        <div style={styles.userLogin} className="user-login">
          <div
              style={{
                ...styles.userLoginBg,
                backgroundImage: `url(${backgroundImage})`,
              }}
          />
          <div style={styles.contentWrapper} className="content-wrapper">
            <h2 style={styles.slogan} className="slogan">
              欢迎使用 <br /> Jasper 后台管理系统
            </h2>
            <div style={styles.formContainer}>
              <h4 style={styles.formTitle}>登录</h4>
              <IceFormBinderWrapper
                  value={this.state.value}
                  onChange={this.formChange}
                  ref="form"
              >
                <div style={styles.formItems}>
                  <Row style={styles.formItem}>
                    <Col>
                      <Icon
                          type="account"
                          size="small"
                          style={styles.inputIcon}
                      />
                      <IceFormBinder name="username" required message="请输入账号">
                        <Input maxLength={20} htmlType="username" placeholder="账号" />
                      </IceFormBinder>
                    </Col>
                    <Col>
                      <IceFormError name="username" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col>
                      <Icon
                          type="ellipsis"
                          test="lock"
                          size="small"
                          style={styles.inputIcon}
                      />
                      <IceFormBinder name="password" required message="请输入密码">
                        <Input htmlType="password" placeholder="密码" />
                      </IceFormBinder>
                    </Col>
                    <Col>
                      <IceFormError name="password" />
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Col>
                      <IceFormBinder name="checkbox">
                        <Checkbox style={styles.checkbox}>记住账号</Checkbox>
                      </IceFormBinder>
                    </Col>
                  </Row>

                  <Row style={styles.formItem}>
                    <Button
                        type="primary"
                        onClick={this.handleSubmit}
                        style={styles.submitBtn}
                    >
                      登 录
                    </Button>
                  </Row>

                  <Row className="tips" style={styles.tips}>
                    {/*<a href="/" style={styles.link}>*/}
                      {/*立即注册*/}
                    {/*</a>*/}
                    {/*<span style={styles.line}>|</span>*/}
                    <a href="/" style={styles.link}>
                      忘记密码?
                    </a>
                  </Row>
                </div>
              </IceFormBinderWrapper>
            </div>
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = {
  userLogin,
};

const mapStateToProps = (state) => {
  return { loginResult: state.login };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'login', reducer });
const styles = {
  userLogin: {
    position: 'relative',
    height: '100vh',
  },
  userLoginBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '30px 20px',
    background: '#fff',
    borderRadius: '6px',
    boxShadow: '1px 1px 2px #eee',
  },
  formItem: {
    position: 'relative',
    marginBottom: '25px',
    flexDirection: 'column',
  },
  formTitle: {
    margin: '0 0 20px',
    textAlign: 'center',
    color: '#3080fe',
    letterSpacing: '12px',
  },
  inputIcon: {
    position: 'absolute',
    left: '0px',
    top: '3px',
    color: '#999',
  },
  submitBtn: {
    width: '100%',
    background: '#3080fe',
    borderRadius: '28px',
  },
  checkbox: {
    marginLeft: '5px',
  },
  tips: {
    textAlign: 'center',
  },
  link: {
    color: '#999',
    textDecoration: 'none',
    fontSize: '13px',
  },
  line: {
    color: '#dcd6d6',
    margin: '0 8px',
  },
};

export default compose(
  withReducer,
  withConnect
)(UserLogin);
