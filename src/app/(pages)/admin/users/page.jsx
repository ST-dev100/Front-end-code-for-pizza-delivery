"use client"
import PackagesTable from '@/app/components/PackageTable'
import UsersTable from '@/app/components/UsersTable'
import React from 'react'

function Users() {
  return (
    <div style={{padding:"10px",backgroundColor:"white",margin:20}}>
      {/* <PackagesTable/> */}
      <UsersTable/>
    </div>
  )
}
 
export default Users