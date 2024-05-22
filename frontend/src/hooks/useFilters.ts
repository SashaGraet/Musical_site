import TFilter from "../types/TFilter";
import {useState} from "react";
import TCheckBox from "../types/TCheckBox";
import {forEach} from "react-bootstrap/ElementChildren";
import checkBox from "../components/CheckBox";

function useFilters (initialFilters: TFilter[]) {
    const [filters, setFilters] = useState(initialFilters)

    function setCheckBoxIsActive (filterName: string, checkBoxValue: string, newIsActive: boolean) {
        let newCheckBox: TCheckBox
        let newFilters: TFilter[] = []
        for (let i = 0; i < filters.length; i++) {
            if (filters[i].filterName === filterName) {
                for(let j = 0; j < filters[i].checkBoxes.length; j++){
                    if (filters[i].checkBoxes[j].value === checkBoxValue) {
                        newCheckBox = filters[i].checkBoxes[j]
                        newCheckBox.isActive = newIsActive
                        break
                    }
                }}
        }
        filters.forEach(filter => {
            if (filter.filterName !== filterName) {
                newFilters.push(filter)
            } else {
                const newCheckBoxes = filter.checkBoxes.map(checkBox => {
                    if (checkBox.value === checkBoxValue) {
                        return newCheckBox
                    } else {
                        return checkBox
                    }
                })
                newFilters.push({
                    ...filter,
                    checkBoxes: newCheckBoxes
                })
            }
        })
        setFilters(newFilters)
    }
    function activeCheckBoxesToString () {
        let finishString = ''
        let isHaveActiveFilter = false
        filters.forEach(filter => {
            let isHaveActiveCheckBox = false
            filter.checkBoxes.forEach(checkBox => {
                if (!isHaveActiveCheckBox && checkBox.isActive) {
                    isHaveActiveCheckBox = true
                    if (!isHaveActiveFilter) {
                        isHaveActiveFilter = true
                    }
                    finishString += `&${filter.filterKey}=${checkBox.value}`

                } else if (isHaveActiveCheckBox && checkBox.isActive) {
                    finishString += `,${checkBox.value}`
                }
            })
        })
        return finishString
    }
    return {setCheckBoxIsActive, filters, activeCheckBoxesToString}
}

export default useFilters