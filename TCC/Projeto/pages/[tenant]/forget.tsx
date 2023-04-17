import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/Forget.module.css';
import { Tenant } from '../../types/Tenant';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase/auth';

const Forget = (data: Props) => {
  const { tenant, setTenant } = useAppContext(); // Inicializando o context

  useEffect(() => {
    setTenant(data.tenant);
  }, []); // Setando o tenant no context para pegar as informações

  const router = useRouter();

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    //enviar email para redefinicao de senha 

    if(email == ''){
      alert('Campo email esta vazio!!')
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Envio com Sucesso!!')
        router.push('/' + data.tenant.slug + '/forget-success');
      })
      .catch((error) => {
        alert('Email nao cadastrado!!')
      })


  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>

      <Header
        color={data.tenant.primaryColor}
        backHref={'/' + data.tenant.slug + '/login'}
      />

      <div className={styles.header}>{data.tenant.name}</div>

      <div className={styles.title}>Esqueceu a senha?</div>

      <div className={styles.subtitle}>Preencha o campo com seu e-mail e receba as instruções para redefinição de sua senha</div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.primaryColor}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
        </div>
      </div>

      <div className={styles.inputArea}>
        <Button1
          color={data.tenant.primaryColor}
          label="Enviar"
          onClick={handleSubmit}
          fill
        />
      </div>

    </div>
  );
}

export default Forget;



// Função usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
  tenant: Tenant
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  console.log('Tenant: ', tenantSlug)
  const api = useApi(tenantSlug as string);

  const tenant = await api.getTenant();

  if (!tenant) {
    return { redirect: { destination: '/', permanent: false } }
  } // Bloqueando o acesso a tenants/estabelecimentos que não existem e voltando pra pagina inicial.

  return {
    props: {
      tenant
    }
  }

}