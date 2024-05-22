import React from "react";
import CheckBoxGroup from "./CheckBoxGroup";
import CheckBox from "./CheckBox";
import useFilters from "../hooks/useFilters";
import getUsers from "../api/getUsers";
// .http://localhost:8000/api/users?gender=Мужской,Женский&role=Гитарист,Барабанщик&city=Москва,Красноярск&age_group=18_25,25_40

type ParamsProps = {
    setFiltersString: React.Dispatch<React.SetStateAction<string>>
}

const Params: React.FC<ParamsProps> = props => {
    const {setCheckBoxIsActive, filters, activeCheckBoxesToString} = useFilters([{filterName: 'Пол', filterKey: 'gender', checkBoxes: [{key: 'Men', value: 'Мужской', isActive: false},{key: 'Women', value: 'Женский', isActive: false}]}])
    const filtersBlocks = filters.map(filter => {
        const checkBoxes = filter.checkBoxes.map(checkBox => {
            return <CheckBox text={checkBox.value} isActive={checkBox.isActive} setIsActive={() => {setCheckBoxIsActive(filter.filterName, checkBox.value, !checkBox.isActive)}}/>
            })
        return <CheckBoxGroup title={filter.filterName} children={checkBoxes}/>
    })
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

            {filtersBlocks}

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
                props.setFiltersString(activeCheckBoxesToString())
            }}>Применить фильтры</button>

            <button className="btn btn-primary" onClick={() => {
                const list = document.getElementsByTagName("input");
                for (let i = 0; i < list.length; i++) {
                    list[i].checked = false
                }
            }}>Сбросить фильтры</button>

        </div>
    )
}

export default Params