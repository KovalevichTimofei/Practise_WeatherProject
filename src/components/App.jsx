import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
        <div>
          <div className="container">
              <header>
                  <h1>Погода и прогноз</h1>
              </header>
              <section class="row">
                  <div class="col-lg-3 col-md-3 col-sm-3">
                      <strong class="cur-weather-text"> Погода в Бресте </strong>
                      <img src="http://openweathermap.org/img/w/03d.png"/>
                      <strong class="cur-weather-text"> 25°C </strong>
                    12 июня, 2018
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            Ветер
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 pointer">
                            Скорость - 6 m/s, порывы - 9 m/s, направление - Зюйд
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            Облачность
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 pointer">
                            Переменная
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            Давление
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 pointer">
                            1024 гПа
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            Влажность
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 pointer">
                            80%
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            Восход Солнца
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 pointer">
                            9:16
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12">
                            Закат Солнца
                        </div>
                        <div class="col-lg-8 col-md-8 col-sm-12 pointer">
                            17:58
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="divider"></div>
                        </div>
                    </div>
            </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
              <img src="http://www.pogodaiklimat.ru/graf/rus/2018/33008_201806.gif" class="graph"/>
                  <div id="brest">
                      <strong> Прогноз погоды, г. Брест </strong>

                  <div class="row">
                      <div class="col-xs-12">
                          <div class="divider"></div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-7">
                          Среда, 13 июня 2018
                          <img src="http://openweathermap.org/img/w/01d.png"/>
                          <small>Завтра</small>
                      </div>
                      <div class="col-xs-5 text-right">
                          20°C, <i>Безоблачно</i>
                          <br/>
                          Ветер: 4,71 м/с
                          <br/>
                          Давление: 10001 гПа
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-12">
                          <div class="divider"></div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-7">
                          Четверг, 14 июня 2018
                          <img src="http://openweathermap.org/img/w/10d.png"/>
                      </div>
                      <div class="col-xs-5 text-right">
                          23°C, <i>Небольшой дождь</i>
                          <br/>
                              Ветер: 3,71 м/с
                              <br/>
                                  Давление: 10004 гПа
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-12">
                          <div class="divider"></div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-7">
                          Пятница, 15 июня 2018
                          <img src="http://openweathermap.org/img/w/10d.png"/>
                      </div>
                      <div class="col-xs-5 text-right">
                          17°C, <i>Дождь</i>
                          <br/>
                              Ветер: 6,82 м/с
                              <br/>
                                  Давление: 10007 гПа
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-12">
                          <div class="divider"></div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-7">
                          Суббота, 16 июня 2018
                          <img src="http://openweathermap.org/img/w/10d.png"/>
                      </div>
                      <div class="col-xs-5 text-right">
                          27°C, <i>Дождь</i>
                          <br/>
                              Ветер: 7,22 м/с
                              <br/>
                                  Давление: 10009 гПа
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-12">
                          <div class="divider"></div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-7">
                          Воскресенье, 17 июня 2018
                          <img src="http://openweathermap.org/img/w/01d.png"/>
                      </div>
                      <div class="col-xs-5 text-right">
                          30°C, <i>Безоблачно</i>
                          <br/>
                          Ветер: 5,64 м/с
                          <br/>
                          Давление: 10009 гПа
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-xs-12">
                          <div class="divider"></div>
                      </div>
                  </div>
          </div>
      </div>
                  <div class="col-xs-3">
                      <div class="well">
                          <ul class="nav">
                              <li class="nav">Города для просмотра</li>
                              <li class="nav-divider"></li>
                              <li class="active"><a href="#brest">Брест</a></li>
                              <li><a href="#vitebsk">Витебск</a></li>
                              <li><a href="#grodno">Гродно</a></li>
                              <li><a href="#gomel">Гомель</a></li>
                              <li><a href="#minsk">Минск</a></li>
                              <li><a href="#mogiliov">Могилёв</a></li>
                              <li class="nav-divider"></li>
                              <li><span class="glyphicon glyphicon-plus"></span></li>
                          </ul>
                      </div>
                  </div>
              </section>
          </div>
            <footer>
                © 2018 TimofeiWeather ® All rights reserved.
            </footer>
        </div>
    );
  }
}

export default App;
