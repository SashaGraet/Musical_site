import React from "react";

const Params = () => {
    return (
        <div>
            <div id='City' className='parametr' style={{height: '250px'}}>
                <h4>Город</h4>
                <div style={{height: '180px', overflow: "auto"}}>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Бас - гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                </div>
            </div>
            <div id='Role' className='parametr' style={{height: '250px'}}>
                <h4>Инструмент</h4>
                <div style={{height: '180px', overflow: "auto"}}>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Бас - гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                    <div>
                        <input type="checkbox"/>
                        <label>Гитара</label>
                    </div>
                </div>
            </div>
            <div id='level' className='parametr'>
                <h4>Уровень</h4>
                <div>
                    <input type="checkbox"/>
                    <label>Начинающий</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label>Продвинутый</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label>Опытный</label>
                </div>
            </div>
            <div id='Gender' className='parametr'>
                <h4>Пол</h4>
                <div>
                    <input type="checkbox"/>
                    <label>Мужской</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label>Женский</label>
                </div>
            </div>
            <div id='Age' className='parametr'>
                <h4>Возраст</h4>
                <div>
                    <input type="checkbox"/>
                    <label>до 18</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label>18 - 25</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label>25 - 40</label>
                </div>
                <div>
                    <input type="checkbox"/>
                    <label>40+</label>
                </div>
            </div>
            <button className="btn btn-primary" onClick={() => {
                const list = document.getElementsByTagName("input");
                for (let i = 0; i < list.length; i++) {
                    list[i].checked = false
                }
            }}>Применить фильтры</button>
            <button className="btn btn-primary" onClick={() => {
                const list = document.getElementsByTagName("input");
                for (let i = 0; i < list.length; i++) {
                    if (list[i].value) {
                    console.log(list[i].list)
                }}
            }}>Сбросить фильтры</button>

        </div>
    )
}

export default Params