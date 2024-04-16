import { Suspense } from 'react';

interface SuspenseComponentProps {
    children?: React.ReactElement;
    fallback?: React.ReactElement;
}

export default function SuspenseComponent({ children, fallback }: SuspenseComponentProps) {
    return (
        <>
            <Suspense fallback={fallback}>
                {children}
            </Suspense>
        </>
    );
}