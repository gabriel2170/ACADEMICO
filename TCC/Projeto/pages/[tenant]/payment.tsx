import { onValue, push, ref, remove, set, update } from '@firebase/database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { useAppContext } from '../../contexts/app';
import { rtdb } from '../../firebase/rtdb';
import { useApi } from '../../lib/useApi';
import { useFormatter } from '../../lib/useFormatter';
import styles from '../../styles/Payment.module.css';
import { Tenant } from '../../types/Tenant';
import { auth } from '../../firebase/auth'
import { InputField } from '../../components/InputField';
import { Button2 } from '../../components/Button2';

type Refeicao = {
    imagem: string;
    chave: string,
    nome: string,
    preco: number,
    qtCount: number,
}

type Usuarios = {
    chave: string;
    email: string;
    nome: string;
}

type Endereco = {
    chave: string,
    bairro: string,
    cep: string,
    cidade: string,
    complemento: string,
    email: string,
    endereco: string,
    numero: string,
    telefone: string,
    uf: string,
    usuario: string
}

const Item = (data: Props) => {
    const { tenant, setTenant } = useAppContext(); // Inicializando o context
    const [pedido, setPedido] = useState<Refeicao[]>()
    const [notas, setNotas]: any = useState(0)
    const [parcela, setParcela]: any = useState(1)
    const user = auth.currentUser
    const formatter = useFormatter();
    const [paymentType, setPaymentType] = useState<'money' | 'card'>('money');
    let total: any = 0
    let id: any, usuario: any, email: any = ''
    let bairro: any, cep: any, cidade: any, complemento: any, endereco: any, numero: any, telefone: any, uf: any = ''
    let lista_prod: any = []
    let formaPag: any = ''
    let troco: any = 0

    useEffect(() => {
        setTenant(data.tenant);

        if (data.tenant.slug == 'delivery1') {
            const lista = ref(rtdb, `Carrinho_1/${user?.uid}`)

            onValue(lista, (res) => {
                const refeicoes = Object.entries<Refeicao>(res.val() ?? {}).map(([chave, valor]) => {

                    return {
                        'chave': chave,
                        'nome': valor.nome,
                        'imagem': valor.imagem,
                        'preco': valor.preco,
                        'qtCount': valor.qtCount

                    }
                })
                setPedido(refeicoes)

            }, { onlyOnce: true })

        }
        if (data.tenant.slug == 'delivery2') {
            const lista = ref(rtdb, `Carrinho_2/${user?.uid}`)

            onValue(lista, (res) => {
                const refeicoes = Object.entries<Refeicao>(res.val() ?? {}).map(([chave, valor]) => {

                    return {
                        'chave': chave,
                        'nome': valor.nome,
                        'imagem': valor.imagem,
                        'preco': valor.preco,
                        'qtCount': valor.qtCount

                    }
                })
                setPedido(refeicoes)

            }, { onlyOnce: true })

        }
        if (data.tenant.slug == 'delivery3') {
            const lista = ref(rtdb, `Carrinho_3/${user?.uid}`)

            onValue(lista, (res) => {
                const refeicoes = Object.entries<Refeicao>(res.val() ?? {}).map(([chave, valor]) => {

                    return {
                        'chave': chave,
                        'nome': valor.nome,
                        'imagem': valor.imagem,
                        'preco': valor.preco,
                        'qtCount': valor.qtCount

                    }
                })
                setPedido(refeicoes)

            }, { onlyOnce: true })


        }
        if (data.tenant.slug == 'delivery4') {
            const lista = ref(rtdb, `Carrinho_4/${user?.uid}`)

            onValue(lista, (res) => {
                const refeicoes = Object.entries<Refeicao>(res.val() ?? {}).map(([chave, valor]) => {

                    return {
                        'chave': chave,
                        'nome': valor.nome,
                        'imagem': valor.imagem,
                        'preco': valor.preco,
                        'qtCount': valor.qtCount

                    }
                })
                setPedido(refeicoes)

            }, { onlyOnce: true })
        }

    }, [])


    async function dadosLogin() {
        const id = ref(rtdb, 'Usuarios')
        onValue(id, (res) => {
            Object.entries<Usuarios>(res.val() ?? {}).map(([chave, valor]) => {
                if (valor.email == user?.email) {
                    usuario = valor.nome
                    email = valor.email
                }
            })


        }, { onlyOnce: true })
    }

    dadosLogin();


    async function dadosAddress() {

        const address = ref(rtdb, 'Endereco')
        onValue(address, (result) => {

            Object.entries<Endereco>(result.val() ?? {}).map(([chave, valor]) => {

                if (valor.email == user?.email) {
                    cep = valor.cep
                    bairro = valor.bairro
                    endereco = valor.endereco
                    numero = valor.numero
                    cidade = valor.cidade
                    complemento = valor.complemento
                    uf = valor.uf
                    telefone = valor.telefone
                }
            })


        }, { onlyOnce: true })
    }

    dadosAddress()


    pedido?.map(itens => {lista_prod.push('\n\n' + itens.qtCount + 'x' +'\n' + itens.nome + '\n\n') })
    pedido?.map(itens => { total += itens.preco })
    pedido?.map(itens => { id = itens.chave })

    const confirmarPagamento = async () => {

        if (paymentType == 'money') {
            formaPag = 'Dinheiro'
            if (notas < total) {

                alert('Saldo Insuficiente para Compra em Dinheiro!!')
            } else {

                if (data.tenant.slug == 'delivery1') {
                    const dados = ref(rtdb, `PedidosConferencia_1/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_1/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })


                    remove(ref(rtdb, `Carrinho_1/${user?.uid}`));

                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }

                if (data.tenant.slug == 'delivery2') {
                    const dados = ref(rtdb, `PedidosConferencia_2/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_2/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    remove(ref(rtdb, `Carrinho_2/${user?.uid}`));

                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }

                if (data.tenant.slug == 'delivery3') {
                    const dados = ref(rtdb, `PedidosConferencia_3/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_3/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })


                    remove(ref(rtdb, `Carrinho_3/${user?.uid}`));

                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }

                if (data.tenant.slug == 'delivery4') {
                    const dados = ref(rtdb, `PedidosConferencia_4/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_4/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    remove(ref(rtdb, `Carrinho_4/${user?.uid}`));



                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }
            }

        } else {
            formaPag = 'Cartao de Credito'

            if (parcela > 6 || parcela < 1) {
                alert('Numero de parcelas permitidas sao entre 1 a 6 vezes no cartao!!')
            } else {
                if (data.tenant.slug == 'delivery1') {
                    const dados = ref(rtdb, `PedidosConferencia_1/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_1/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })


                    remove(ref(rtdb, `Carrinho_1/${user?.uid}`));

                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }

                if (data.tenant.slug == 'delivery2') {
                    const dados = ref(rtdb, `PedidosConferencia_2/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_2/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    remove(ref(rtdb, `Carrinho_2/${user?.uid}`));

                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }

                if (data.tenant.slug == 'delivery3') {
                    const dados = ref(rtdb, `PedidosConferencia_3/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_3/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })


                    remove(ref(rtdb, `Carrinho_3/${user?.uid}`));

                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }

                if (data.tenant.slug == 'delivery4') {
                    const dados = ref(rtdb, `PedidosConferencia_4/${id}`);
                    const dados2 = ref(rtdb, `PedidosPendentes_4/${id}`);

                    set(dados, {
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    set(dados2, {
                        status: 'conferencia',
                        usuario,
                        email,
                        cep,
                        bairro,
                        endereco,
                        numero,
                        complemento,
                        cidade,
                        uf,
                        telefone,
                        lista_prod,
                        formaPag,
                        troco,
                        parcela,
                        total
                    })

                    remove(ref(rtdb, `Carrinho_4/${user?.uid}`));



                    alert('Pedido finalizado com sucesso!!')
                    Router.push('/' + data.tenant.slug)
                }
            }

        }

    }


    troco = notas - total;

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.tenant.name} </title>
            </Head>

            <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
                <div className={styles.header}>
                    <Header
                        color={data.tenant.primaryColor}
                        backHref={'/' + data.tenant.slug + '/address/'}
                        invert
                    />
                </div>
            </div>

            <div className={styles.paymentArea}>

                <div className={styles.title}>Pagamento</div>

                <div className={styles.line}></div>

                <div className={styles.subTitle}>Tipo de pagamento</div>

                <div className={styles.paymentType}>

                    <div className={styles.paymentBtn}>
                        <Button2
                            color={data.tenant.primaryColor}
                            leftIcon="money"
                            label="Dinheiro"
                            onClick={() => setPaymentType('money')}
                            fill={paymentType === 'money'}
                        />
                    </div>

                    <div className={styles.paymentBtn}>
                        <Button2
                            color={data.tenant.primaryColor}
                            rightIcon="card"
                            label="Cartão"
                            onClick={() => setPaymentType('card')}
                            fill={paymentType === 'card'}
                        />
                    </div>

                </div>

            </div>

            <div className={styles.infoArea}>

                {paymentType === 'money' &&


                    <div className={styles.infoBody}>

                        <div className={styles.infoTitle}>Quanto você tem em dinheiro?</div>

                        <input
                            type='text'
                            color={data.tenant.primaryColor}
                            id={styles.troco}
                            placeholder="R$0,00"
                            value={notas}
                            min={0}
                            onChange={(e) => setNotas((e.target.value).replace(',', '.'))}
                        />

                        <div
                            className={styles.finalPrice}
                            style={{ color: data.tenant.primaryColor }}>
                            Preço final: {total.toFixed(2)} <br /> {notas > total ? 'Troco: ' + troco.toFixed(2) : null} {/*{finalPrice}*/}
                        </div>
                    </div>
                }

                {paymentType === 'card' &&
                    <>
                        <div className={styles.infoBody}>
                            <div className={styles.infoTitle}>Numero de parcelas</div>

                            <input type="number" id={styles.parcela} value={parcela} min={1} max={6} onChange={(e) => setParcela(e.target.value)} />
                        </div>

                        <div
                            className={styles.finalPrice}
                            style={{ color: data.tenant.primaryColor }}>
                            Preço final: {total.toFixed(2)}
                        </div>
                    </>

                }

            </div>




            <div className={styles.button}>
                <Button1
                    color={data.tenant.primaryColor}
                    label="Confirmar Pagamento"
                    fill
                    onClick={() => confirmarPagamento()} />
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

    // Retornando tenant e o produto
    return {
        props: {
            tenant,

        }
    }

}
