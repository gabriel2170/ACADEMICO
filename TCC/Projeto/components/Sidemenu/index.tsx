import { useAuthContext } from '../../contexts/auth';
import { Tenant } from '../../types/Tenant';
import { Button1 } from '../Button1';
import styles from './styles.module.css';
import { SideMenuItem } from '../SideMenuItem';
import { useRouter } from 'next/router';
import { rtdb } from '../../firebase/rtdb'
import { auth } from '../../firebase/auth';
import { useState } from 'react';
import { onValue, ref } from '@firebase/database';
import { FirebaseError } from 'firebase/app';


type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void;
}

type Usuarios = {
    chave: string;
    email: string;
    nome: string;
}

export const Sidemenu = ({ tenant, open, onClose }: Props) => {
    const { user, setToken } = useAuthContext();

    const loginUser = auth.currentUser
    const [tag, setTag] = useState('')

    const dadosLogin = () => {
        const id = ref(rtdb, 'Usuarios')
        onValue(id, (res) => {
            const User = Object.entries<Usuarios>(res.val() ?? {}).map(([chave, valor]) => {
                if (valor.email == loginUser?.email) {
                    setTag(valor.nome)
                }
            })
            if (FirebaseError) throw FirebaseError;
        }, { onlyOnce: true })
    }

    dadosLogin();

    const verificaLoginop1 = () => {
        if (loginUser) {
            router.push('/' + tenant.slug + '/cart')
        } else {
            router.push('/' + tenant?.slug + '/login')
        }
    }

    const verificaLoginop2 = () => {
        if (loginUser) {
            router.push('/' + tenant.slug + '/orders')
        } else {
            router.push('/' + tenant?.slug + '/login')
        }
    }


    const Sair = () => {
        auth.signOut()
        router.push('/' + tenant?.slug + '/login')
    }

    const router = useRouter();

    return (
        <div className={styles.container}
            style={{
                width: open ? '100vw' : '0'
            }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div className={styles.loginArea}
                        style={{ borderBottomColor: tenant.primaryColor }}
                    >
                        {loginUser != null ?

                            <>
                                <span className={styles.user}>{`Seja Bem vindo Sr(a) ${tag}`}</span>
                            </>

                            :
                            <Button1
                                color={tenant.primaryColor}
                                label="Fazer Login"
                                onClick={() => router.push('/' + tenant.slug + '/login')}
                                fill />
                        }


                    </div>
                    <div className={styles.closeBtn}
                        style={{ color: tenant.primaryColor }}
                        onClick={onClose}
                    >❌</div>

                </div>

                <div className={styles.line1}></div>

                <div className={styles.menu}>

                    <SideMenuItem
                        color={tenant.primaryColor}
                        label="Pagina Inicial"
                        onClick={onClose}
                    />
                    <SideMenuItem
                        color={tenant.primaryColor}
                        label="Restaurantes"
                        onClick={() => router.push('/')}
                    />

                    {loginUser != null ?
                        <SideMenuItem
                            color={tenant.primaryColor}
                            label="Carrinho"
                            onClick={() => verificaLoginop1()}
                        />
                        :
                        null
                    }

                    {loginUser != null ?
                        <SideMenuItem
                            color={tenant.primaryColor}
                            label="Meus Pedidos"
                            onClick={() => verificaLoginop2()}
                        />
                        :
                        null
                    }

                    {loginUser != null ?
                        <SideMenuItem
                            color={tenant.primaryColor}
                            label="Configurações"
                            onClick={() => router.push(tenant.slug + '/configUser')}
                        />
                        :
                        null
                    }

                    {loginUser != null ?
                        <SideMenuItem
                            color={tenant.primaryColor}
                            label="Sair"
                            onClick={() => Sair()}
                        />
                        :
                        null
                    }

                </div>

                <div className={styles.line2}></div>

                <div className={styles.leave}>
                    {user && // quando tiver um usuario ira mostrar esse label
                        <SideMenuItem
                            color={tenant.primaryColor}
                            label="Sair"
                            onClick={() => {
                                setToken('')
                                onClose();
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    );
}