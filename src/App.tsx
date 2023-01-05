import React, { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import api from './helper/api'
import { useQuery, useMutation } from 'react-query'
import { useState } from 'react'

const App = () => {
  const [page, setPage] = useState<number>(1)
  const [perPage, setPerPage] = useState<number>(10)
  const { data, isLoading } = useQuery(
    ['listExample', page, perPage],
     () =>
    api
      .create()
      .getListExample(page, perPage)
      .then((res) => res.data),
  )

  const renderListExample = () => {
    if (isLoading) return <div>loading</div>
    if (!data?.data) return <div>No data</div>
    return data?.data?.map((item: any) => <div key={item.id}>{item.name}</div>)
  }

  const { mutate: getUserInfo } = useMutation(
    async () => {
      return api.create().getUserInfo(4)
    },
    {
      onSuccess: async (res: any) => {
        console.log('res = ', res.data);
        
      },
      onError: async (error: any) => {
        console.log('error = ', error);
        
      }
    }
  )

  return (
    <div className="App">
      <button onClick={() => getUserInfo()} >get userInfo</button>
      <div>page</div>
      <input
        value={page}
        onChange={(e: any) => setPage(Number(e.target.value))}
        type="number"
      />
      <div>per page</div>
      <input
        value={perPage}
        onChange={(e: any) => setPerPage(Number(e.target.value))}
        type="number"
      />
      {renderListExample()}

      
    </div>
  )
}

export default App
