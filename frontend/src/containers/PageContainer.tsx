import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';

interface Props {
  children: React.ReactNode;
}

const PageContainer = ({ children }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prevState) => !prevState);

  return (
    <PageLayout isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}>
      {children}
    </PageLayout>
  );
};

export default PageContainer;
