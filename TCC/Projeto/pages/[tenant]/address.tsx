import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import { useFormatter } from '../../lib/useFormatter';
import styles from '../../styles/Address.module.css';
import { Tenant } from '../../types/Tenant';
import Router from 'next/router';
import cep from 'cep-promise'
import { rtdb } from '../../firebase/rtdb';
import { onValue, push, ref, set } from '@firebase/database';
import { auth } from '../../firebase/auth';

type Usuarios = {
    chave: string;
    email: string;
    nome: string;
  }
  

const Item = (data: Props) => {
    const { tenant, setTenant } = useAppContext(); // Inicializando o context
    const user = auth.currentUser
    let usuario:any = ''
    let email:any = ''
    let key:any = ''
    const [cod, setCod]: any = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero]: any = useState()
    const [bairro, setBairro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [tel, setTel] = useState('')


    useEffect(() => {
        setTenant(data.tenant);
    }, []); // Setando o tenant no context para pegar as informações

    //Atualizar quantidade de itens

    async function dadosLogin() {
        const id = ref(rtdb, 'Usuarios')
        onValue(id, (res) => {
          Object.entries<Usuarios>(res.val() ?? {}).map(([chave, valor]) => {
            if (valor.email == user?.email) {
              key = chave
              usuario = valor.nome
              email = valor.email
            }
          })
    
    
        }, { onlyOnce: true })
      }
    
      dadosLogin();

    const confirmarEndereco = async () => {

        if (cod == '' || cod == null || cod == undefined) {
            alert('Campo CEP nao pode ficar vazio!!')

        }
        else if (endereco == '' || endereco == null || endereco == undefined) {
            alert('Campo Endereco nao pode ficar vazio!!')

        }
        else if (numero == '' || numero == null || numero == undefined) {
            alert('Campo Numero nao pode ficar vazio!!')

        }
        else if (bairro == '' || bairro == null || bairro == undefined) {
            alert('Campo Bairro nao pode ficar vazio!!')

        }
        else if (cidade == '' || cidade == null || cidade == undefined) {
            alert('Campo Cidade nao pode ficar vazio!!')

        }
        else if (uf == '' || uf == null || uf == undefined) {
            alert('Campo UF nao pode ficar vazio!!')

        }
        else if (tel == '' || tel == null || tel == undefined) {
            alert('Campo Telefone nao pode ficar vazio!!')

        }

        else {

            const addAdress = ref(rtdb, `Endereco/${key}`);

            set(addAdress, {
                email:email,
                usuario: usuario,
                cep: cod,
                endereco: endereco,
                numero: numero,
                bairro: bairro,
                complemento: complemento,
                cidade: cidade,
                uf: uf,
                telefone: tel
            })

            alert('Endereco Adicionado!!')
            Router.push('/' + data.tenant.slug + '/payment')

        }
    }

    function buscaCep() {

        cep(cod)
            .then((res: any) => {
                setEndereco(res.street)
                setBairro(res.neighborhood)
                setCidade(res.city)
                setUf(res.state)
            })
            .catch(((err: any) => {
                alert('Nenhum endereco encontrado com numero do CEP')
            }))


    }



    const formatter = useFormatter();

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} </title>
            </Head>

            <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
                <div className={styles.header}>
                    <Header
                        color={data.tenant.primaryColor}
                        backHref={'/' + data.tenant.slug + '/cart/'}
                        invert
                    />
                </div>
            </div>

            <div className={styles.AddressArea} >

                <div className={styles.title}>Endereco de Entrega</div>

                <div className={styles.line}></div>

                <div className={styles.Address}>
                    <div className={styles.addressItem}>CEP
                        <input type="text" value={cod} onChange={(e) => setCod(e.target.value)} className={styles.mediumBox} placeholder='00000-000' />
                    </div>
                </div>

                <div className={styles.Address2}>
                    <div className={styles.addressItem}>Endereço
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} className={styles.largeBox} onClick={() => buscaCep()} />
                    </div>

                    <div className={styles.addressItem}>Numero
                        <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className={styles.smallBox} placeholder='0000' onClick={() => buscaCep()} />
                    </div>
                </div>

                <div className={styles.Address}>
                    <div className={styles.addressItem}>Bairro
                        <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className={styles.fullBox} onClick={() => buscaCep()} />
                    </div>
                </div>

                <div className={styles.Address}>
                    <div className={styles.addressItem}>Complemento
                        <input type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} className={styles.fullBox} placeholder="(Opcional)" onClick={() => buscaCep()} />
                    </div>
                </div>

                <div className={styles.Address3}>
                    <div className={styles.addressItem}>Cidade
                        <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className={styles.largeBox} onClick={() => buscaCep()} />
                    </div>

                    <div className={styles.addressItem}>UF
                        <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} className={styles.smallBox} onClick={() => buscaCep()} />
                    </div>
                </div>

                <div className={styles.Address}>
                    <div className={styles.addressItem}>Contato
                        <input type="text" value={tel} onChange={(e) => setTel(e.target.value)} className={styles.mediumBox} placeholder='(00)00000-0000' onClick={() => buscaCep()} />
                    </div>
                </div>

            </div>

            <div className={styles.button}>
                <Button1
                    color={data.tenant.primaryColor}
                    label="Confirmar Endereco de Entrega"
                    fill
                    onClick={confirmarEndereco}
                />
            </div>

        </div>
    );
}

export default Item;



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

    // Pegando o product
    const product = await api.getProduct(parseInt(id as string));

    // Retornando tenant e o produto
    return {
        props: {
            tenant,
            product,

        }
    }

}