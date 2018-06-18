import React, { Component } from 'react';
import Modal from 'react-modal';
import AddCity from '../AddCity';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        backgroundColor       : 'lightgray'
    }
};

export default class Model extends Component{

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#ff0000';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    myStorage = window.localStorage;

    render() {
        let self = this;
        //console.log(self.myStorage);
        function add(){
            let list = JSON.parse(self.myStorage.getItem('citiesList'));

            if(list === null || list === undefined){
                list = [];
            }

            //console.log('before push');
            //console.log(list);

            list.push({
                city: document.getElementById('City').value,
                code: document.getElementById('Code').value
            });

            //console.log('after push');
            //console.log(list);
            //console.log(self.myStorage);
            self.myStorage.setItem('citiesList', JSON.stringify(list));
            //console.log(self.myStorage);
            self.props.reRender(list);
            self.closeModal();
        }

        return (
            <div>
                <AddCity openModal={this.openModal}/>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <button onClick={this.closeModal} className='close'>Закрыть</button>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Расширение списка городов</h2>


                    <form>
                        <label>
                            Введите название города, который хотите добавить: <input type='text' id='City'/>
                        </label>
                        <br/>
                        <label>
                            Введите код страны, в которой он находится: <input type='text' id='Code'/>
                        </label>
                    </form>
                    <button onClick={add}>Добавить</button>
                </Modal>
            </div>
        );
    }
}
