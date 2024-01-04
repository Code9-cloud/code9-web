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
    services: Record<string,ServiceType>;
    flows: Record<string, FlowType>;
};

type ApplicationType = {
    name: string;
    entities: Record<string,EntityType>;
    services: Record<string, ServiceType>;
    flows: Record<string, FlowType>;
    database?: {
        url: string;
        name: string;
        username?: string;
        password?: string;
    };
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

const testApplication: ApplicationType = {
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
            position: {x: 200, y: 200},
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
            position: {x: 500, y: 200},
        },
        order: {
            name: 'Order',
            id: 'order',
            attributes: {
                order_id: {
                    name: 'Order Id',
                    type: 'string',
                    id: 'order_id',
                    isPrimary: true,
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                table_id: {
                    name: 'Table Id',
                    type: 'string',
                    id: 'table_id',
                    isRequired: false,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                restaurant_id: {
                    name: 'Restaurant Id',
                    type: 'attribute_ref',
                    id: 'restaurant_id',
                    referenceEntityId: 'restaurant',
                    referenceAttributeId: 'restaurant_id',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                transactions: {
                    name: 'Transactions',
                    type: 'attribute_ref',
                    referenceEntityId: 'transaction',
                    referenceAttributeId: 'transaction_id',
                    id: 'transactions',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                }
            },
            position: {x: 800, y: 350},
        },
        menu_item: {
            name: 'Menu Item',
            id: 'menu_item',
            attributes: {
                menu_item_id: {
                    name: 'Menu Item Id',
                    type: 'string',
                    id: 'menu_item_id',
                    isPrimary: true,
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                item_name: {
                    name: 'Item Name',
                    type: 'string',
                    id: 'item_name',
                    isRequired: true,
                    isIndexed: true,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                item_price: {
                    name: 'Item Price',
                    type: 'number',
                    id: 'item_price',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                }
            },
            position: {x: 200, y: 500},
        },
        menu: {
            name: 'Menu',
            id: 'menu',
            attributes: {
                menu_id: {
                    name: 'Menu Id',
                    type: 'string',
                    id: 'menu_id',
                    isPrimary: true,
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                restaurant_id: {
                    name: 'Restaurant Id',
                    type: 'attribute_ref',
                    referenceEntityId: 'restaurant',
                    referenceAttributeId: 'restaurant_id',
                    id: 'restaurant_id',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                items: {
                    name: 'Items',
                    type: 'attribute_ref',
                    referenceEntityId: 'menu_item',
                    referenceAttributeId: 'menu_item_id',
                    id: 'items',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                }
            },
            position: {x: 500, y: 500},
        },
        transaction: {
            name: 'Transaction',
            id: 'transaction',
            attributes: {
                transaction_id: {
                    name: 'Transaction Id',
                    type: 'string',
                    id: 'transaction_id',
                    isPrimary: true,
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                amount: {
                    name: 'Amount',
                    type: 'number',
                    id: 'amount',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
            },
            position: {x: 500, y: 800},
        },
    },
    services: {
        'auth': {
            name: 'Authentication',
            id: 'auth',
            services: {
            },
            flows: {
            }
        }
    },
    flows: {
        'test': {
            name: 'Test Flow',
            id: 'test',
        }
    }
};

const emptyApplication: ApplicationType = {
    name: '',
    entities: {},
    services: {},
    flows: {}
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const [user, setUser] = useState<UserType>(null);
    const [application, setApplication] = useState<ApplicationType>(testApplication);
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
        setApplication(testApplication);
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