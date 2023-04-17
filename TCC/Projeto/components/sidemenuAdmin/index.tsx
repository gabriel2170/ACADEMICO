import { useAuthContext } from '../../contexts/auth';
import { Tenant } from '../../types/Tenant';
import { Button1 } from '../Button1';
import styles from './styles.module.css';
import { SideMenuItem } from '../SideMenuItem';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/auth';


type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void;
}

export const SidemenuAdmin = ({ tenant, open, onClose }: Props) => {
    const { user, setToken } = useAuthContext();

    const router = useRouter();
    const loginUser = auth.currentUser

    function logOff() {
        auth.signOut()
        router.push('/' + tenant?.slug + '/login')
    }

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
                    {tenant?.slug == 'delivery1'?
                        <>
                            <span className={styles.user}>{'Bem Vindo Administrador'}</span>
                        </>
                        : tenant?.slug == 'delivery2'?
                        <>
                            <span className={styles.user}>{'Bem Vindo Administrador'}</span>
                        </>
                        : tenant?.slug == 'delivery3'?
                        <>
                            <span className={styles.user}>{'Bem Vindo Administrador'}</span>
                        </>
                        : tenant?.slug == 'delivery4'?
                        <>
                            <span className={styles.user}>{'Bem Vindo Administrador'}</span>
                        </>
                        : null
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
                        label="Conferencia de Pedidos"
                        onClick={() => router.push('/' + tenant?.slug + '/pending')}
                    />
                    <SideMenuItem
                        color={tenant.primaryColor}
                        label="Pedidos para Entrega"
                        onClick={() => router.push('/' + tenant?.slug + '/deliver')}
                    />
                    <SideMenuItem
                        color={tenant.primaryColor}
                        label="Sair"
                        onClick={() => router.push('/')}
                    />

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