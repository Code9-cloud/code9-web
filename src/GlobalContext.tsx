import React, { createContext, useState, ReactNode } from 'react';

type AttributeType = {
    name: string;
    type: string;
    referenceEntityId?: string;
    referenceAttributeId?: string;
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

type FlowType = {
    name: string;
    id: string;
}

type ServiceType = {
    name: string;
    id: string;
    // position: { x: number, y: number };
    subServices: Record<string,ServiceType>;
    flows: Record<string, FlowType>;
};

type ApplicationType = {
    name: string;
    entities: Record<string,EntityType>;
    services: Record<string, ServiceType>;
    flows: Record<string, FlowType>;
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
    application: ApplicationType;
    setApplication: (app: ApplicationType) => void;
    loadApplication: () => void;
    addEntityToApplication: (entity: EntityType) => void;
    addAttributeToEntity: (entityId: string, attribute: AttributeType) => void;
    setAttribute: (entityId: string, attributeId: string, attribute: AttributeType) => void;
    changeEntityName: (entityId: string, name: string) => void;
    currentServicePath: string[];
    setCurrentServicePath: (path: string[]) => void;
};

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

type GlobalProviderProps = {
    children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [user, setUser] = useState<UserType>(null);
    const [application, setApplication] = useState<ApplicationType>({
        name: '',
        entities: {},
        services: {},
        flows: {}
    });
    const [currentSection, setCurrentSection] = useState('Entities');
    const [currentServicePath, setCurrentServicePath] = useState<string[]>([]);

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
                            type: 'entity_ref',
                            referenceEntityId: 'table',
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
            },
            services: {
                'auth': {
                    name: 'Authentication',
                    id: 'auth',
                    subServices: {
                    },
                    flows: {
                    }
                }
            },
            flows: {
            }
        });
    }

    const addEntityToApplication = (entity: EntityType) => {
        setApplication((app) => {
            if (!app) return app;
            return {
                ...app,
                entities: {
                    ...app.entities,
                    [entity.id]: entity,
                }
            };
        });
    }

    const addAttributeToEntity = (entityId: string, attribute: AttributeType) => {
        setApplication((app) => {
            if (!app) return app;
            return {
                ...app,
                entities: {
                    ...app.entities,
                    [entityId]: {
                        ...app.entities[entityId],
                        attributes: {
                            ...app.entities[entityId].attributes,
                            [attribute.id]: attribute,
                        }
                    }
                }
            };
        });
    }

    const setAttribute = (entityId: string, attributeId: string, attribute: AttributeType) => {
        setApplication((app) => {
            if (!app) return app;
            return {
                ...app,
                entities: {
                    ...app.entities,
                    [entityId]: {
                        ...app.entities[entityId],
                        attributes: {
                            ...app.entities[entityId].attributes,
                            [attributeId]: attribute,
                        }
                    }
                }
            };
        });
    }

    const changeEntityName = (entityId: string, name: string) => {
        setApplication((app) => {
            if (!app) return app;
            return {
                ...app,
                entities: {
                    ...app.entities,
                    [entityId]: {
                        ...app.entities[entityId],
                        name: name,
                    }
                }
            };
        });
    }

    return (
        <GlobalContext.Provider value={{ user, signIn, signOut, currentSection, setSection, application, setApplication, loadApplication, addEntityToApplication, addAttributeToEntity, setAttribute, changeEntityName, currentServicePath, setCurrentServicePath}}>
            {children}
        </GlobalContext.Provider>
    );
};