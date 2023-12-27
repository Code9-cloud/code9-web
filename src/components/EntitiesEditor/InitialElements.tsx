import React from 'react';
import { MarkerType, Position } from 'reactflow';

export const nodes : any = [
    {
        id: '1',
        type: 'entityNode',
        position: { x: 0, y: 0 },
        data: { value: 123, entity_name: 'Table', attributes: [
            {
                name: 'Table Id',
                type: 'string',
                id: 'table_id',
                isRequired: true,
                isIndexed: false,
                isUnique: false,
                isImmutable: false,
                isSensitive: false,
            },
            {
                name: 'Table Number',
                type: 'int',
                id: 'table_number',
                isRequired: true,
                isIndexed: false,
                isUnique: false,
                isImmutable: false,
                isSensitive: false,
            },
            {
                name: 'Restaurant Id',
                type: 'string',
                id: 'restaurant_id',
                isRequired: true,
                isIndexed: false,
                isUnique: false,
                isImmutable: false,
                isSensitive: false,
            }
        ]},
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: '2',
        type: 'entityNode',
        position: { x: 300, y: 0 },
        data: { value: 123, entity_name: 'Restaurant', attributes: [
                {
                    name: 'Restaurant Id',
                    type: 'string',
                    id: 'restaurant_id',
                    isRequired: true,
                    isIndexed: true,
                    isUnique: true,
                    isImmutable: true,
                    isSensitive: true,
                },
                {
                    name: 'Tables',
                    type: 'table',
                    id: 'tables',
                    isRequired: true,
                    isIndexed: false,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                },
                {
                    name: 'Restaurant Name',
                    type: 'string',
                    id: 'restaurant_name',
                    isRequired: true,
                    isIndexed: true,
                    isUnique: false,
                    isImmutable: false,
                    isSensitive: false,
                }
            ]},
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    }
];

export const edges : any = [
    { id: 'e1-2', source: '1', target: '2', label: 'this is an edge label' },
    // { id: 'e1-3', source: '1', target: '3', animated: true },
    // {
    //     id: 'e4-5',
    //     source: '4',
    //     target: '5',
    //     type: 'smoothstep',
    //     sourceHandle: 'handle-0',
    //     data: {
    //         selectIndex: 0,
    //     },
    //     markerEnd: {
    //         type: MarkerType.ArrowClosed,
    //     },
    // },
    // {
    //     id: 'e4-6',
    //     source: '4',
    //     target: '6',
    //     type: 'smoothstep',
    //     sourceHandle: 'handle-1',
    //     data: {
    //         selectIndex: 1,
    //     },
    //     markerEnd: {
    //         type: MarkerType.ArrowClosed,
    //     },
    // },
];