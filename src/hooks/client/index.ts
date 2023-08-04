import {} from '@sveltejs/kit';

export const getSession = () => {
    const theme = 'dark';
    return {theme};
};