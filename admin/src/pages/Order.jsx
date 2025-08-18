import React from 'react'
import Layout from '../components/Layout'
import withAuth from '../components/withAuth'
const Order = () => {
  return (
    <Layout>
        <div>Order</div>
    </Layout>
  )
}

export default withAuth(Order)