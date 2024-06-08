import { useCallback, useState } from "react";

export const useConfirmation = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const requestConfirmation = useCallback(() => {
        return new Promise<boolean>((resolve) => {
            setIsModalOpen(true);
            setResolver(() => resolve);
        });
    }, []);

    const handleUserResponse = useCallback((response: boolean) => {
        if (resolver) {
            resolver(response);
            setIsModalOpen(false);
            setResolver(null);
        }
    }, [resolver]);

    return { isModalOpen, requestConfirmation, handleUserResponse };
};