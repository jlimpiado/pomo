import {FC} from 'react';
import {ProviderChildProps} from "../types.ts";
import ThemeProvider from "./themeProvider.tsx";
import UserProvider from "./userProvider.tsx";

const providers = [
    ThemeProvider,
    UserProvider
]

const RootProvider: FC<ProviderChildProps> = ({children}) => {
    return providers.reduceRight((acc, Provider) => (
        <Provider>
            {acc}
        </Provider>
    ), children)
}

export default RootProvider;