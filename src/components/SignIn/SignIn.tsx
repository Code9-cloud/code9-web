import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { GlobalContext } from '../../GlobalContext';

const SignIn: React.FC = () => {
    const { signIn } = useContext(GlobalContext);

    const handleSignIn = () => {
        signIn({ name: 'User', avatar: '/path/to/avatar.jpg' });
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleSignIn}>
                Sign In
            </Button>
        </div>
    );
};

export default SignIn;
