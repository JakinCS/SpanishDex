import HomepageHeader from '@/components/headers/homepage/HomepageHeader';
import HomepageFooter from '@/components/HomepageFooter';
import { auth } from "@/auth"
import { Suspense } from 'react';
import HomepageHeaderSkeleton from '@/components/headers/homepage/HomepageHeaderSkeleton';

export const experimental_ppr = true;

export default function homepageLayout({ children }) {
  // Get session information
  // const session = await auth();

  const containerStyles = {
    height: 'calc(100vh - 82px)',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between'
  }

  return (
    <>
      <Suspense fallback={<HomepageHeaderSkeleton />}>
        <HomepageHeader />      
      </Suspense>
      <div style={containerStyles}>
        <div>
          {children}
        </div>      
        <HomepageFooter />
      </div>
    </>
  );
}
