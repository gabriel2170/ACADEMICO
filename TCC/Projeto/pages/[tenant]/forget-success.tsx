import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button1 } from '../../components/Button1';
import { Header } from '../../components/Header';
import { Icon } from '../../components/Icon';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import styles from '../../styles/ForgetSuccess.module.css';
import { Tenant } from '../../types/Tenant';

const ForgetSuccess = (data: Props) => {
  const { tenant, setTenant } = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []); // Setando o tenant no context para pegar as informações

  const router = useRouter();

  const handleSubmit = () => {
    router.push('/' + data.tenant.slug + '/login');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>

      <Header
        color={data.tenant.primaryColor}
        backHref={'/' + data.tenant.slug + '/forget'}
      />

      <div className={styles.header}>{data.tenant.name}</div>

      <div className={styles.iconArea}>
        <Icon icon='emailSent' width={100} height={100} color={''} svg={''} />
      </div>

      <div className={styles.title}>Verifique seu Email</div>

      <div className={styles.subtitle}>Enviamos instruções para acessar novamente sua conta no seu e-mail cadastrado</div>

      <div className={styles.inputArea}>
        <Button1
          color={data.tenant.primaryColor}
          label="Fazer Login"
          onClick={handleSubmit}
          fill
        />
      </div>

    </div>
  );
}

export default ForgetSuccess;



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