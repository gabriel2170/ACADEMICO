import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/db";
import Link from 'next/link';
import { Tenant } from '../../types/Tenant';
import { GetServerSideProps } from "next";
import { useApi } from "../../lib/useApi";
import { useFormatter } from "../../lib/useFormatter";
import { useAppContext } from "../../contexts/app";
import styles from './styles.module.css';

/*
const Cardapio: any = () => {
    const { tenant, setTenant } = useAppContext(); // Inicializando o context
    const formatter = useFormatter();
    const [itens, setItens]: any = useState([])




    
    dadosCardapio();

    async function dadosCardapio() {
        const dados = await getDocs(collection(db, 'Refeicoes'))

        dados.docs.map(doc => setItens(doc));

        render(itens)
    }

    

    function render(itens:any){
    
        return(
        itens.forEach((doc:any) => {
            <Link href={tenant?.slug + '/product/' + doc.id}>
                <a className={styles.container}>
                    <div className={styles.head} style={{ backgroundColor: tenant?.primaryColor }}></div>
                    <div className={styles.info}>
                        <div className={styles.img}>
                            <img src={doc.data().imagem} />
                        </div>
                        <div className={styles.tName}>{doc.data().tipo_item}</div>
                        <div className={styles.name}>{doc.data().nome}</div>
                        <div className={styles.price} style={{ color: tenant?.primaryColor }}>{formatter.formatPrice(doc.data().preco)}</div>
                    </div>
                </a>
            </Link>
        })
        )
    }
  

}



export default Cardapio;

*/

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

    // Pegando os products e recebendo um array
    const products = await api.getAllProducts();


    return {
        props: {
            tenant,
            products
        }
    }

}
