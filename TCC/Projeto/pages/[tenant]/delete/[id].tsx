import { onValue, ref, remove, set } from '@firebase/database';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router, { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../../components/Button1';
import { Header } from '../../../components/Header';
import { useAppContext } from '../../../contexts/app';
import { rtdb } from '../../../firebase/rtdb';
import { useApi } from '../../../lib/useApi';
import { useFormatter } from '../../../lib/useFormatter';
import styles from '../../../styles/Delete.module.css';
import { Tenant } from '../../../types/Tenant';

const Delete = (data: Props) => {
  const { tenant, setTenant } = useAppContext();
  const [nome, setNome] = useState('');
  const [opc, setOpc] = useState('');
  const [preco, setPreco]: any = useState();
  const [id, setId]: any = useState('')
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    setTenant(data.tenant);
    const refData = ref(rtdb, 'itensToUpdate/');
    onValue(refData, (doc) => {
      setId(doc.val().id)
      setNome(doc.val().nome)
      setPreco(doc.val().preco)
      setImagem(doc.val().imagem)
      setOpc(doc.val().opc)
    })
  }, []);

  async function Deletar() {
    if (data.tenant.slug == 'delivery1') {
      remove(ref(rtdb, `Pizzaria do Tiao/${id}`))
      alert('Item Deletado!!')
      router.push('/' + data.tenant.slug + '/admin')
    }

    if (data.tenant.slug == 'delivery2') {
      remove(ref(rtdb, `Cervejaria da Marlene/${id}`))
      alert('Item Deletado!!')
      router.push('/' + data.tenant.slug + '/admin')
    }

    if (data.tenant.slug == 'delivery3') {
      remove(ref(rtdb, `Ze do Burguer/${id}`))
      alert('Item Deletado!!')
      router.push('/' + data.tenant.slug + '/admin')
    }
    if (data.tenant.slug == 'delivery4') {
      remove(ref(rtdb, `Sorveteria do Lionel/${id}`))
      alert('Item Deletado!!')
      router.push('/' + data.tenant.slug + '/admin')
    }
  }

  const formatter = useFormatter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Exclusão de refeição | {data.tenant.name} </title>
      </Head>

      <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
        <Header
          color={data.tenant.primaryColor}
          backHref={'/' + data.tenant.slug + '/admin'}
          invert
        />
      </div>

      <div className={styles.titleArea}>
        <div className={styles.title}>Exclusão | {data.tenant.name} </div>

        <div className={styles.line1}></div>
      </div>

      <div className={styles.form}>

        <div className={styles.productImage}>
          <img src={imagem} className={styles.image} />
        </div>

        <div className={styles.formItem}>{'Nome '}
          <input type="text" value={nome} className={styles.input} disabled />
        </div>

        <div className={styles.formItem} >{'Ingredientes '}
          <input type="text" value={opc} className={styles.input} disabled />
        </div>

        <div className={styles.formItem}>{'Preço '}
          <input type="number" value={preco} className={styles.input} disabled />
        </div>

      </div>
      <div className={styles.line2}></div>

      <div className={styles.button}>
        <Button1
          color={data.tenant.primaryColor}
          label="Excluir item"
          fill
          onClick={Deletar} />
      </div>


    </div>
  );
}

export default Delete;



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