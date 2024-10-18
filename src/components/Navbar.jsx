import React from 'react'
import Logo from './Logo';
import useStore from '../stores';
import noavatar from '../assets/noavatar.png';
import { Menu, rem } from '@mantine/core';
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
// Dask mode

// state global -> use.... zuntand
const {user, showModal, setShowModal , setUser} = useStore();
// authe/author + naviga

// UserMenu khi da login nen dong goi thanh funtion : gon return + dong goi thanh conponent neu can thiet

// handleShowModalLogin nam o 2 noi : nav va btn startpage (neu page chua dang nhap)
    // state+setState - zustand / use-disclosure @mantine/hooks : zustand vi no su dung o 2 noi Nav va startPage

const navigate = useNavigate()
const handleLogout = ()=>{
    setUser({});
    localStorage.removeItem('user-blog-codewave');
    localStorage.removeItem('token-blog-codewave');
    navigate('/auth')
}
  return (
    <nav className='flex justify-between'>
        {/* social */}
        <div>
            icon social
        </div>
        {/* logo */}
        <Logo/>
        {/* login/info user+dropdown */}
        <div>
            {user?.name && (
                <Menu>
                <Menu.Target>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <div className='w-10 h-10 overflow-hidden rounded-full'>
                            <img src={user?.image || noavatar} alt={user?.image} className='w-full h-full'/>
                        </div>
                        <h3 className='font-bold'>{user?.name}</h3>
                    </div>
                </Menu.Target>
          
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<CgProfile style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Profile
                  </Menu.Item>
          
                  <Menu.Item
                    leftSection={<FiLogOut style={{ width: rem(14), height: rem(14) }} />}
                    onClick={handleLogout}
                  >
                    LogOut
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
                
            )}


            {!user?.name && (
                <button onClick={setShowModal}>
                    login
                </button>
            )}
        </div>
    </nav>
  )
}

export default Navbar