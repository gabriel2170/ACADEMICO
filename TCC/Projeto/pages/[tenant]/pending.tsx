import styles from "../../styles/Pending.module.css";
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import { Tenant } from '../../types/Tenant';
import { onValue, push, ref, remove, set } from "@firebase/database";
import { rtdb } from "../../firebase/rtdb";
import { FirebaseError } from "firebase/app";

type Refeicao = {
    chave: string,
    usuario: string,
    email: string,
    cep: string,
    bairro: string,
    endereco: string,
    numero: string,
    cidade: string,
    complemento: string,
    uf: string,
    telefone: string,
    lista_prod: string,
    total: number,
    formaPag: string,
    troco: number,
    parcela: number,
}

const Cart = (data: Props) => {

    const { tenant, setTenant } = useAppContext();
    const [refeicao, setRefeicao] = useState<Refeicao[]>()

    //Fazer a busca por dados no firebase para depois renderiza-los abaixo 
    useEffect(() => {
        setTimeout(function () {
            window.location.reload();
        }, 600000); // 1 minuto para recarregar pagina

        setTenant(data.tenant);

        if (data.tenant.slug == 'delivery1') {
            const lista = ref(rtdb, `PedidosConferencia_1`)

            onValue(lista, (result) => {

                const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
                    return {
                        'chave': chave,
                        'usuario': valor.usuario,
                        'email': valor.email,
                        'cep': valor.cep,
                        'bairro': valor.bairro,
                        'endereco': valor.endereco,
                        'numero': valor.numero,
                        'cidade': valor.cidade,
                        'complemento': valor.complemento,
                        'uf': valor.uf,
                        'telefone': valor.telefone,
                        'lista_prod': valor.lista_prod,
                        'total': valor.total,
                        'formaPag': valor.formaPag,
                        'troco': valor.troco,
                        'parcela': valor.parcela,

                    }
                })

                setRefeicao(Refeicoes)

                if (FirebaseError) throw FirebaseError;
            }, { onlyOnce: true })

        }
        if (data.tenant.slug == 'delivery2') {
            const lista = ref(rtdb, `PedidosConferencia_2`)

            onValue(lista, (result) => {

                const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
                    return {
                        'chave': chave,
                        'usuario': valor.usuario,
                        'email': valor.email,
                        'cep': valor.cep,
                        'bairro': valor.bairro,
                        'endereco': valor.endereco,
                        'numero': valor.numero,
                        'cidade': valor.cidade,
                        'complemento': valor.complemento,
                        'uf': valor.uf,
                        'telefone': valor.telefone,
                        'lista_prod': valor.lista_prod,
                        'total': valor.total,
                        'formaPag': valor.formaPag,
                        'troco': valor.troco,
                        'parcela': valor.parcela,

                    }
                })

                setRefeicao(Refeicoes)
                if (FirebaseError) throw FirebaseError;
            }, { onlyOnce: true })

        }
        if (data.tenant.slug == 'delivery3') {
            const lista = ref(rtdb, `PedidosConferencia_3`)

            onValue(lista, (result) => {

                const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
                    return {
                        'chave': chave,
                        'usuario': valor.usuario,
                        'email': valor.email,
                        'cep': valor.cep,
                        'bairro': valor.bairro,
                        'endereco': valor.endereco,
                        'numero': valor.numero,
                        'cidade': valor.cidade,
                        'complemento': valor.complemento,
                        'uf': valor.uf,
                        'telefone': valor.telefone,
                        'lista_prod': valor.lista_prod,
                        'total': valor.total,
                        'formaPag': valor.formaPag,
                        'troco': valor.troco,
                        'parcela': valor.parcela,

                    }
                })
                setRefeicao(Refeicoes)
                if (FirebaseError) throw FirebaseError;
            }, { onlyOnce: true })

        }
        if (data.tenant.slug == 'delivery4') {
            const lista = ref(rtdb, `PedidosConferencia_4`)

            onValue(lista, (result) => {

                const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {

                    return {
                        'chave': chave,
                        'usuario': valor.usuario,
                        'email': valor.email,
                        'cep': valor.cep,
                        'bairro': valor.bairro,
                        'endereco': valor.endereco,
                        'numero': valor.numero,
                        'cidade': valor.cidade,
                        'complemento': valor.complemento,
                        'uf': valor.uf,
                        'telefone': valor.telefone,
                        'lista_prod': valor.lista_prod,
                        'total': valor.total,
                        'formaPag': valor.formaPag,
                        'troco': valor.troco,
                        'parcela': valor.parcela,

                    }
                })
                setRefeicao(Refeicoes)
                if (FirebaseError) throw FirebaseError;
            }, { onlyOnce: true })
        }

    }, []);

    //Aceitar Pedido
    function aceitar(idItem: string, usuario: string, email: string, cep: string, bairro: string, endereco: string, numero: string, cidade: string, uf: string, complemento: string, telefone: string, lista_prod: string, total: number, formaPag: string, troco: number, parcela: number) {
        if (data.tenant.slug == 'delivery1') {
            const refData = ref(rtdb, `PedidosEntrega_1/${idItem}`)
            const refData2 = ref(rtdb, `PedidosConferencia_1/${idItem}`)
            const refData3 = ref(rtdb, `PedidosPendentes_1/${idItem}`)

            set(refData, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela

            })

            set(refData3, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(refData2)

            alert('Pedido de Cliente foi Aceito!!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery2') {
            const refData = ref(rtdb, `PedidosEntrega_2/${idItem}`)
            const refData2 = ref(rtdb, `PedidosConferencia_2/${idItem}`)
            const refData3 = ref(rtdb, `PedidosPendentes_2/${idItem}`)


            set(refData, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            set(refData3, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(refData2)

            alert('Pedido de Cliente foi Aceito!!')
            console.log(refData2)
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery3') {
            const refData = ref(rtdb, `PedidosEntrega_3/${idItem}`)
            const refData2 = ref(rtdb, `PedidosConferencia_3/${idItem}`)
            const refData3 = ref(rtdb, `PedidosPendentes_3/${idItem}`)


            set(refData, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            set(refData3, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(refData2)

            alert('Pedido de Cliente foi Aceito!!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery4') {
            const refData = ref(rtdb, `PedidosEntrega_4/${idItem}`)
            const refData2 = ref(rtdb, `PedidosConferencia_4/${idItem}`)
            const refData3 = ref(rtdb, `PedidosPendentes_4/${idItem}`)

            set(refData, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            set(refData3, {
                status: 'aceito',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(refData2)

            alert('Pedido de Cliente foi Aceito!!')
            window.location.reload()
        }

    }

    //Recusar Pedido 
    function recusar(idItem: string, usuario: string, email: string, cep: string, bairro: string, endereco: string, numero: string, cidade: string, uf: string, complemento: string, telefone: string, lista_prod: string, total: number, formaPag: string, troco: number, parcela: number) {
        if (data.tenant.slug == 'delivery1') {
            const refData = ref(rtdb, `PedidosPendentes_1/${idItem}`)

            set(refData, {
                status: 'recusado',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(ref(rtdb, `PedidosConferencia_1/${idItem}`))

            alert('Pedido de Cliente foi Recusado!!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery2') {
            const refData = ref(rtdb, `PedidosPendentes_2/${idItem}`)

            set(refData, {
                status: 'recusado',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(ref(rtdb, `PedidosConferencia_2/${idItem}`))

            alert('Pedido de Cliente foi Recusado!!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery3') {
            const refData = ref(rtdb, `PedidosPendentes_3/${idItem}`)

            set(refData, {
                status: 'recusado',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(ref(rtdb, `PedidosConferencia_3/${idItem}`))

            alert('Pedido de Cliente foi Recusado!!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery4') {
            const refData = ref(rtdb, `PedidosPendentes_4/${idItem}`)


            set(refData, {
                status: 'recusado',
                usuario: usuario,
                email: email,
                cep: cep,
                bairro: bairro,
                endereco: endereco,
                numero: numero,
                cidade: cidade,
                uf: uf,
                complemento: complemento,
                telefone: telefone,
                lista_prod: lista_prod,
                total: total,
                formaPag: formaPag,
                troco: troco,
                parcela: parcela
            })

            remove(ref(rtdb, `PedidosConferencia_4/${idItem}`))

            alert('Pedido de Cliente foi Recusado!!')
            window.location.reload()
        }
    }

    //Renderizar Pedidos para conferencia do Restaurante
    return (
        <div className={styles.container}>
            <Head>
                <title> Conferencia de Pedidos</title>
            </Head>

            <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
                <Header
                    color={data.tenant.primaryColor}
                    backHref={'/' + data.tenant.slug + '/admin'}
                    invert
                />
            </div>
            <div className={styles.titleArea}>
                <div className={styles.title}>Conferencia de Pedidos</div>

            </div>

            <div className={styles.line}></div>

            <div className={styles.grid}>
                {refeicao?.map(itens => {

                    return (
                        <>
                            <div className={styles.box}>

                                <div key={itens.chave} className={styles.client}>{'Cliente: ' + itens.usuario}</div>

                                <div className={styles.infoBody}>

                                    <div className={styles.items}>
                                        <div className={styles.itemTitle}>Itens do carrinho</div>
                                        <div className={styles.item}>{itens.lista_prod}</div>
                                    </div>

                                    <div className={styles.prices}>
                                        <div className={styles.priceTitle}>Forma de pagamento</div>
                                        <div className={styles.price}>{itens.formaPag + ': R$' + itens.total.toFixed(2)}</div>
                                        <div className={styles.price}>{itens.formaPag == 'Dinheiro' && itens.troco > 0.00 ? 'Troco: R$' + itens.troco.toFixed(2) : itens.formaPag == 'Cartao de Credito' ? 'Parcelas: ' + itens.parcela + 'x  R$' + (itens.total / itens.parcela).toFixed(2) : null}</div>
                                    </div>

                                    <div className={styles.infoAddress}>
                                        <div className={styles.addressTitle}>Mais informações</div>
                                        <div className={styles.address} >{"Endereco de Entrega: " + itens.endereco + ", " + itens.numero + " " + itens.complemento + " " + itens.bairro + " " + itens.cidade + " " + itens.uf}</div>
                                        <div className={styles.address}>{"Telefone de contato: " + itens.telefone}</div>
                                    </div>

                                    <div className={styles.btns}>
                                        <div className={styles.btn1} onClick={() => aceitar(itens.chave, itens.usuario, itens.email, itens.cep, itens.bairro, itens.endereco, itens.numero, itens.cidade, itens.uf, itens.complemento, itens.telefone, itens.lista_prod, itens.total, itens.formaPag, itens.troco, itens.parcela)}>ACEITAR</div>
                                        <div className={styles.btn2} onClick={() => recusar(itens.chave, itens.usuario, itens.email, itens.cep, itens.bairro, itens.endereco, itens.numero, itens.cidade, itens.uf, itens.complemento, itens.telefone, itens.lista_prod, itens.total, itens.formaPag, itens.troco, itens.parcela)}>RECUSAR</div>
                                    </div>

                                    <div className={styles.line1}></div>

                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>

    );

}

export default Cart;

// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();

    // Selecionando o tenant
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

    return {
        props: {
            tenant,
        }
    }
}
