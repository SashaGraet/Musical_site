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
    const {setCheckBoxIsActive, filters, activeCheckBoxesToString} = useFilters([
        {filterName: 'Город', filterKey: 'city', checkBoxes: [
            {key: 'Москва', value: 'Москва', isActive: false}, {key: 'Красноярск', value: 'Красноярск', isActive: false},
            {key: 'Челябинск', value: 'Челябинск', isActive: false}, {key: 'Екатеренбург', value: 'Екатеренбург', isActive: false},
            {key: 'Рязань', value: 'Рязань', isActive: false}, {key: 'Казань', value: 'Казань', isActive: false},
            {key: 'Поронайск', value: 'Поронайск', isActive: false}, {key: 'Самара', value: 'Самара', isActive: false}
            ]},
        {filterName: 'Инструмент', filterKey: 'role', checkBoxes: [
            {key: 'Барабанщик', value: 'Барабанщик', isActive: false}, {key: 'Певец', value: 'Певец', isActive: false},
            {key: 'Гитарист', value: 'Гитарист', isActive: false}, {key: '', value: 'Красноярск', isActive: false},
            ]},
        {filterName: 'Пол', filterKey: 'gender', checkBoxes: [
            {key: 'Мужской', value: 'Мужской', isActive: false},{key: 'Женский', value: 'Женский', isActive: false}
            ]},
        {filterName: 'Возраст', filterKey: 'age_group', checkBoxes: [
            {key: 'under_18', value: 'Меньше 18', isActive: false}, {key: '18_25', value: 'От 18 до 25', isActive: false},
            {key: '25_40', value: 'От 25 до 40', isActive: false}, {key: 'over_40', value: 'Больше 40', isActive: false}
            ]},
        {filterName: 'Уровень', filterKey: 'experience', checkBoxes: [
            {key: '', value: 'Начинающий', isActive: false}, {key: '', value: 'Опытный', isActive: false}, {key: 'Продвинутый', value: 'Красноярск', isActive: false}
            ]},
    ])


    const filtersBlocks = filters.map(filter => {
        const checkBoxes = filter.checkBoxes.map(checkBox => {
            return <CheckBox text={checkBox.value} isActive={checkBox.isActive} setIsActive={() => {setCheckBoxIsActive(filter.filterName, checkBox.value, !checkBox.isActive)}}/>
            })
        return <CheckBoxGroup title={filter.filterName} children={checkBoxes}/>
    })

    return (
        <div>
            {filtersBlocks}

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