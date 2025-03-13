import { defineStore } from 'pinia'
import { ref } from 'vue'

import { getAddressListApi, getDefaultAddressApi, addAddressApi, setDefaultAddressApi } from '@/api/index/addressBookApi'
export const AddressStore = defineStore('address', () => {
    // 地址列表
    const addressList = ref<any>({})
    // 默认地址
    const defaultAddress = ref<any>({})
    // 获取地址列表
    const getAddressList = async () => {
        try {
            // 调用接口获取地址列表
            const res = await getAddressListApi()
            // 将地址列表保存到 addressList 中
            addressList.value = res.data
        } catch (error) {
            console.error('获取地址列表失败:', error)
        }
    }

    // 查询默认地址
    const getDefaultAddress = async () => {
        setDefaultAddressApi
        try {
            // 调用接口查询默认地址
            const res = await getDefaultAddressApi()
            // 将默认地址保存到 defaultAddress 中
            defaultAddress.value = res.data
        } catch (error) {
            console.error('查询默认地址失败:', error)
        }
    }
    // 设置默认地址
    const setDefaultAddress = async (id: string) => {
        try {
            // 调用接口设置默认地址
            await setDefaultAddressApi(id)
            // 重新查询默认地址
            getDefaultAddress()
        } catch (error) {
            console.error('设置默认地址失败:', error)
        }
    }

    // 新增地址
    const addAddress = async (data: any) => {
        try {
            // 调用接口新增地址
            await addAddressApi(data)
            // 重新查询地址列表
            getAddressList()
        } catch (error) {
            console.error('新增地址失败:', error)
        }
    }

    return { addressList, getAddressList, defaultAddress, getDefaultAddress, setDefaultAddress, addAddress }
})