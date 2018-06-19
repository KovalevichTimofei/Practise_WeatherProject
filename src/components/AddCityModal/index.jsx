import React, { Component } from 'react';
import Modal from 'react-modal';
import AddCity from '../AddCity';
import './styles.css'

export default class Model extends Component{

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    myStorage = window.localStorage;

    render() {
        let self = this;
        function add() {
            let list = JSON.parse(self.myStorage.getItem('citiesList'));

            if (list === null || list === undefined) {
                list = [];
            }

            list.push({
                city: document.getElementById('City').value,
                code: document.getElementById('Code').value,
                engCity: document.getElementById('EngCity').value
            });

            self.myStorage.setItem('citiesList', JSON.stringify(list));
            self.props.reRender(list);
            self.closeModal();
        }

        return (
            <div>
                <AddCity openModal={this.openModal.bind(this)}/>
                <Modal
                    className='custom'
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this)}
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
                    <button className='btn btn-primary' onClick={add}>Добавить</button>
                </Modal>
            </div>
        );
    }
}
