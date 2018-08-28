import React, { Component } from 'react';
import Modal from 'react-modal';
import AddCity from '../AddCity';
import './styles.css';

export default class Model extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
    };
    const { modalIsOpen } = this.state;
    this.modalIsOpen = modalIsOpen;
  }

  handleModal = () => {
    this.modalIsOpen = !this.modalIsOpen;
    this.setState({ modalIsOpen: this.modalIsOpen });
  };

  close = () => {
    this.props.add();
    this.handleModal();
  };

  render() {
    return (
      <div>
        <AddCity openModal={this.handleModal} />
        <Modal
          className="custom"
          isOpen={this.modalIsOpen}
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
              Введите код страны, в которой он находится: <input type="text" id="Code" />
            </label>
          </form>
          <button type="button" className="btn btn-primary" onClick={this.close}>Добавить</button>
        </Modal>
      </div>
    );
  }
}
