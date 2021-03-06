import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './styles.css';
import switchOpenClose from '../../actions/switchOpenClose';

class Model extends Component {
  componentWillMount() {
    Modal.setAppElement('body');
  }

  ifItEnter = (event) => {
    if (event.keyCode === 13){
      this.close();
    }
  };

  handleModal = () => {
    const { dispatch, modalIsOpen } = this.props;
    dispatch(switchOpenClose.switchState(modalIsOpen));
  };

  close = () => {
    const { add } = this.props;
    add()
      .then((result) => {
        if (result) {
          this.handleModal();
        } else {
          document.getElementById('City').value = 'Write correct data!';
          document.getElementById('Code').value = 'Write correct data!';
          document.getElementById('EngCity').value = 'Write correct data!';
        }
      });
  };

  render() {
    const { modalIsOpen } = this.props;
    return (
      <div>
        <span
          className="glyphicon glyphicon-plus add-city"
          onClick={this.handleModal}
          role="button"
          tabIndex={0}
        />
        <Modal
          className="custom"
          isOpen={modalIsOpen}
          onRequestClose={this.handleModal}
          contentLabel="Example Modal"
        >
          <button type="button" onClick={this.handleModal} className="close">Закрыть</button>
          <h2 ref={(subtitle) => { this.subtitle = subtitle; }} className="title">Расширение списка городов</h2>
          <form className="form-horizontal">
            <label>
              Введите название города, который хотите добавить: <input type="text" id="City" />
            </label>
            <br />
            <label>
              Введите название этого города на английском: <input type="text" id="EngCity" />
            </label>
            <br />
            <label>
              Введите код страны, в которой он находится: <input type="text" id="Code" onKeyDown={this.ifItEnter} />
            </label>
          </form>
          <button type="button" className="btn btn-primary" onClick={this.close}>Добавить</button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = function ({ addCityModalState }) {
  return { modalIsOpen: addCityModalState.modalIsOpen };
};

export default connect(mapStateToProps)(Model);
