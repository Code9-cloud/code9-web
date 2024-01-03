import React, { createContext, useState, ReactNode } from 'react';

type AttributeType = {
    name: string;
    type: string;
    id: string;
    isPrimary?: boolean;
    isRequired: boolean;
    isIndexed: boolean;
    isUnique: boolean;
    isImmutable: boolean;
    isSensitive: boolean;
};

type EntityType = {
    name: string;
    id: string;
    attributes: Record<string,AttributeType>;
    position: { x: number, y: number };
};

type ApplicationType = {
    name: string;
    entities: Record<string,EntityType>;
};

type UserType = {
    name: string;
    avatar: string;
} | null;

type GlobalContextType = {
    user: UserType;
    signIn: (userData: UserType) => void;
    signOut: () => void;
    currentSection: string;
    setSection: (section: string) => void;
    application: ApplicationType | null;
    loadApplication: () => void;
    addEntityToApplication: (entity: EntityType) => void;
};

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

type GlobalProviderProps = {
    children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [user, setUser] = useState<UserType>(null);
    const [application, setApplication] = useState<ApplicationType | null>(null);
    const [currentSection, setCurrentSection] = useState('Entities');

    const signIn = (userData: UserType) => {
        setUser(userData);
    };

    const signOut = () => {
        setUser(null);
    };

    const setSection = (section: string) => {
        setCurrentSection(section);
    }

    const loadApplication = () => {
        setApplication({
            name: 'TestPOS',
            entities: {
                table: {
                    name: 'Table',
                    id: 'table',
                    attributes: {
                        table_id: {
                            name: 'Table Id',
                            type: 'string',
                            id: 'table_id',
                            isPrimary: true,
                            isRequired: true,
                            isIndexed: false,
                            isUnique: false,
                            isImmutable: false,
                            isSensitive: false,
                        },
                        table_number: {
                            name: 'Table Number',
                            type: 'number',
                            id: 'table_number',
                            isRequired: true,
                            isIndexed: false,
                            isUnique: false,
                            isImmutable: false,
                            isSensitive: false,
                        },
                        restaurant_id: {
                            name: 'Restaurant Id',
                            type: 'string',
                            id: 'restaurant_id',
                            isRequired: true,
                            isIndexed: false,
                            isUnique: false,
                            isImmutable: false,
                            isSensitive: false,
                        }
                    },
                    position: {x: 0, y: 0},
                },
                restaurant: {
                    name: 'Restaurant',
                    id: 'restaurant',
                    attributes: {
                        restaurant_id: {
                            name: 'Restaurant Id',
                            type: 'string',
                            id: 'restaurant_id',
                            isPrimary: true,
                            isRequired: true,
                            isIndexed: true,
                            isUnique: true,
                            isImmutable: true,
                            isSensitive: true,
                        },
                        tables: {
                            name: 'Tables',
                            type: 'table',
                            id: 'tables',
                            isRequired: true,
                            isIndexed: false,
                            isUnique: false,
                            isImmutable: false,
                            isSensitive: false,
                        }
                    },
                    position: {x: 300, y: 0},
                }
            }
        });
    }

    const addEntityToApplication = (entity: EntityType) => {
        setApplication((app) => {
            if (!app) return app;
            app.entities[entity.id] = entity;
            return app;
        });
    }

    return (
        <GlobalContext.Provider value={{ user, signIn, signOut, currentSection, setSection, application, loadApplication, addEntityToApplication}}>
            {children}
        </GlobalContext.Provider>
    );
};