import AuthContext from './hoc/authContext';
import AuthConsumer, { setCustomValidator, hasAuth } from './hoc/authConsumer';
import { AuthWrapper } from './hoc/authWrapper';

const AuthProvider = AuthContext.Provider;
export { AuthProvider, AuthConsumer, setCustomValidator, AuthWrapper, hasAuth };
