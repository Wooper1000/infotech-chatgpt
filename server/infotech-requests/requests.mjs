//import instance from "../auth/auth-request.mjs";
import axios from "axios";
import dateFormat from "dateformat";
import equipmentSchedule from "../equipmentTable/equipment.json" assert { type: "json" };
import setupInstance from "../auth/auth-request.mjs";


export const getJobList = async (authData)=>{
return  await setupInstance(authData).post(`joblist/get`)
}

export const getTicket = async (authData,order)=>{
return  await setupInstance(authData).get(`Tickets/get?number=${order}`)

}
export const getOrderIP = async (authData,order) => {
    return await setupInstance(authData,order).get(`tickets/getsettings?number=${order}`)
}
export const makeCall = async (authData,key)=>{
 return await setupInstance(authData).get(`/call/ticket?Key=${key}`)
}
export const getAddressUid = async (uid)=>{
    let promise = await instance.post(`/addresses/getbyphaddress?full&uid=${uid}`).catch(err=>console.log('Ошибка получения UID',uid))
    return {
        uid: promise.data['Список'][0]['Ссылка'],
        name: promise.data['Список'][0]['Наименование'],
        street: promise.data['Список'][0]['Улица'],
        home: promise.data['Список'][0]['Дом'],
        additionalInfo: promise.data['Список'][0]['ДопДанные'],
    }
}
export const getContractsByAddress = async (uid,flat)=>{
    let address = {
        "Договор": "",
        "АдресАрендодателя": {
            "uid": uid.uid.toString(),
            "Code": "",
            "Name": uid.name.toString()
        },
        "АдресУлица": uid.street.toString(),
        "АдресДом": uid.home.toString(),
        "АдресЛитера": uid.additionalInfo.find(element => {
            return element['Тип'] === 'Литера'
        }) ? uid.additionalInfo.find(element => {
            return element['Тип'] === 'Литера'
        })['Значение'] : '',
        "АдресКорпус": uid.additionalInfo.find(element => {
            return element['Тип'] === 'Корпус'
        }) ? uid.additionalInfo.find(element => {
            return element['Тип'] === 'Корпус'
        })['Значение'] : '',
        "АдресКвартира": flat.toString()
    }
    let promise = await getClientsByAddress(address)
    return promise
}
export const getClientsByAddress = async (address) => {
    let promise = await instance.post(`/GetClientsByAddress/get`, address).catch(err=>{
        console.log(err)})
    return promise.data['Answer']
}

export const getContractStatus = async (contracts) => {
    let promise =  await instance.post(`home/contractstatus`,{"contracts":contracts})
    return promise.data['Answer']
}
export const getContractInfo = async (contract) => {
    let promise =  await instance.get(`Tickets/FillByContract?number=${contract}`).catch(err=>console.log(err))
    return promise.data['Answer']
}
export const getReport = async (start,finish,variant) => {
    let startDate = dateFormat(start, "yyyy-mm-dd") + "T00:00:00"
    let endDate = dateFormat(finish, "yyyy-mm-dd") + "T23:59:59"
    let promise = await instance.post('Reports/Get', {
        "id": "c2f0ef93-c513-11ea-b976-005056b57a2d",
        "param": {
            "Filter": [],
            "Params": [
                {
                    "id": "d98ea70f-c5d9-4c44-9808-7d98f9971031",
                    "use": true,
                    "value": {
                        "Variant": variant ? variant: "Этотмесяц",
                        "StartDate": startDate,
                        "EndDate": endDate
                    }
                }
            ]
        }
    })
    return promise.data['Answer']
}
export const getJobHistory = async(orderNumber) => {
    let promise = await instance.get(`/job/history?number=${orderNumber}`)
    return promise.data['Answer']
}
export const getEquipmentList = async() => {
    let promise = await instance.get(`trade/getEquipmentByOrders`)
    let equipmentList =  promise.data['Answer']
    let activeEquipment = equipmentList.filter(equipment=>{
        return equipmentSchedule.hasOwnProperty(equipment['Номенклатура']['uid'])
    }).map(equipment=>{
        return {
            'Заявка':equipment['Заявка'],
            'СерийныйНомер':equipment['СерийныйНомер'],
            Presentation:equipment['Номенклатура'].Presentation
        }
    })
    let groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
   return groupBy(activeEquipment,'Presentation')
}