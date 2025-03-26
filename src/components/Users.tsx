import { getUsers } from '@/app/endpoints'
import React from 'react'

const Users = async () => {
  const users: any[] = await getUsers()

  return (
    <div style={{margin: '15px 20% 15px 20%'}}>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#d40000] font-['Bebas_Neue'] tracking-wide">ACTIVE <span className="text-yellow-500">USERS</span></h1>
      </div>
      <table style={{width: '100%', border: '1px solid white', borderCollapse: 'collapse'}}>
        <tr style={{background: '#d40000', border: '1px solid white', borderCollapse: 'collapse'}}>
          <th style={{border: '1px solid white', borderCollapse: 'collapse', fontSize:'22px', fontWeight: 'bold'}}>User Email</th>
          <th style={{border: '1px solid white', borderCollapse: 'collapse', fontSize:'22px', fontWeight: 'bold'}}>Role</th>
          <th></th>
        </tr>
          {users.map(user => (
            <tr style={{background: '#f0b100', border: '1px solid white', borderCollapse: 'collapse', cursor: 'pointer'}}>
              <td style={{textAlign: 'center', fontSize:'22px', fontWeight: 'bold'}}>{user.email}</td>
              <td style={{textAlign: 'center', fontSize:'22px', fontWeight: 'bold'}}>{user.Role.name}</td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default Users