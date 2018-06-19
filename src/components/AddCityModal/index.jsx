import React, { Component } from 'react';
import Modal from 'react-modal';
import AddCity from '../AddCity';
import './styles.css'

export default class Model extends Component{

    state = {
        modalIsOpen: false
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    close = () => {
        this.props.add();
        this.closeModal();
    };

    render() {
        return (
            <div>
                <AddCity openModal={this.openModal.bind(this)}/>
                <Modal
                    className='custom'
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal.bind(this)}
                    contentLabel="Example Modal"
                >
                    <button onClick={this.closeModal.bind(this)} className='close'>Закрыть</button>
                    <h2 ref={subtitle => this.subtitle = subtitle} className='title'>Расширение списка городов</h2>
                    <form>
                        <label>
                            Введите название города, который хотите добавить: <input type='text' id='City'/>
                        </label>
                        <br/>
                        <label>
                            Введите название этого города на английском: <input type='text' id='EngCity'/>
                        </label>
                        <br/>
                        <label>
                            Введите код страны, в которой он находится: <input type='text' id='Code'/>
                        </label>
                    </form>
                    <button className='btn btn-primary' onClick={this.close}>Добавить</button>
                </Modal>
            </div>
        );
    }
}
