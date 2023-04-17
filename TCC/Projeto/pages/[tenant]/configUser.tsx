import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import { useFormatter } from '../../lib/useFormatter';
import styles from '../../styles/Config.module.css';
import { Tenant } from '../../types/Tenant';
import { auth } from '../../firebase/auth'
import { rtdb } from '../../firebase/rtdb';
import { onValue, ref, set } from '@firebase/database';
import { updateEmail, updatePassword } from 'firebase/auth';
import Router from 'next/router';

type Usuarios = {
    chave: string;
    email: string;
    nome: string;
    password: string;
}


const Change = (data: Props) => {
    const { tenant, setTenant } = useAppContext(); // Inicializando o context
    const [nome, setNome]: any = useState('');
    const [senha, setSenha]: any = useState('');
    const [newsenha, setNewsenha]: any = useState('');
    const [confirmar, setConfirmar]: any = useState('')
    const [confAtual, setConfAtual]:any = useState('')
    const [id, setId]: any = useState('');
    const user: any = auth.currentUser;
    


    useEffect(() => {
        setTenant(data.tenant);

        const id = ref(rtdb, 'Usuarios')
        onValue(id, (res) => {
            Object.entries<Usuarios>(res.val() ?? {}).map(([chave, valor]) => {
                if (valor.email == user?.email) {
                    setId(chave)
                    setNome(valor.nome)
                    setConfAtual(valor.password)
                }
            })

        }, { onlyOnce: true })

    }, []);


    function salvar() {


        const saveData = ref(rtdb, `Usuarios/${id}`)

        if (confirmar != '' || senha != '' || newsenha != '') {

            if (confirmar != newsenha) {
                alert('As senhas nao sao iguais, confirme em ambos os campos antes de modificar a senha!!')
            } else if (senha != confAtual) {
                alert('Senha Atual esta incorreta, confirme a sua senha antes de realizar a alteracao')
            } else {


                set(saveData, {
                    email: user?.email,
                    nome: nome,
                    password: newsenha
                })

                updatePassword(user, senha).then(() => {
                    console.log('Senha atualizada!!')
                }).catch((error) => {
                    console.log(error)
                })

                alert('Cadastro Atualizado!!');        
                Router.push('/' + data.tenant.slug)
               

            }



        } else {
            set(saveData, {
                email: user?.email,
                nome: nome,
                password: confAtual,
            })

            alert('Cadastro Atualizado!!');
            Router.push('/' + data.tenant.slug)
            
        }


    }

    const formatter = useFormatter();

    return (
        <div className={styles.container}>
            <Head>
                <title>Configuração de Usuario</title>
            </Head>

            <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
                <Header
                    color={data.tenant.primaryColor}
                    backHref={'/' + data.tenant.slug}
                    invert
                />
            </div>

            <div className={styles.titleArea}>
                <div className={styles.title}>Configurações</div>

                <div className={styles.line1}></div>
            </div>

            <div className={styles.form}>

                <div className={styles.formItem}>{'Nome '}
                    <input type="text" value={nome} className={styles.input} onChange={(e) => { setNome(e.target.value) }} placeholder={`${nome}`} />

                </div>

                <div className={styles.formItem}>{'Senha Atual'}
                    <input type="password" value={senha} className={styles.input} onChange={(e) => { setSenha(e.target.value) }} />
                </div>

                <div className={styles.formItem}>{'Nova Senha '}
                    <input type="password" value={newsenha} className={styles.input} onChange={(e) => { setNewsenha(e.target.value) }} />
                </div>
                <div className={styles.formItem}>{'Confirmar Nova Senha '}
                    <input type="password" value={confirmar} className={styles.input} onChange={(e) => { setConfirmar(e.target.value) }} />
                </div>

            </div>

            <div className={styles.button}>
                <Button1
                    color={data.tenant.primaryColor}
                    label="Salvar"
                    fill
                    onClick={salvar} />
            </div>

        </div>
    );
}

export default Change;

// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query;
    console.log('Tenant: ', tenantSlug)
    const api = useApi(tenantSlug as string);
    const tenant = await api.getTenant();

    // Selecionando o tenant
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

    // Retornando tenant e o produto
    return {
        props: {
            tenant,
        }
    }
}
