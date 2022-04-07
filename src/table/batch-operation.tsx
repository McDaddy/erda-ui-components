// import React from 'react';
// import { GetRowKey } from 'antd/lib/table/interface';
// import { Button, Checkbox, Dropdown } from 'antd';
// import ErdaIcon from '../icon';

// interface IBatchProps<T> {
//   rowKey?: string | GetRowKey<T>;
//   dataSource: T[];
//   selectedKeys?: React.Key[];
//   operations?: BatchAction[];
//   operationRender?: (op: BatchAction) => JSX.Element;
//   onSelectChange: (keys: React.Key[]) => void;
// }

// interface BatchAction {
//   key: string;
//   name: string;
//   disabled?: boolean;
//   onClick: (selectedKeys: React.Key[]) => void;
//   isVisible?: (selectedKeys: React.Key[]) => boolean;
// }

// const defaultOperationRender = (op: BatchAction) => {
//   return <div>{op.name}</div>;
// };

// const emptyKeys: Array<string | number> = [];

// const BatchOperation = <T extends Obj>(props: IBatchProps<T>) => {
//   const {
//     rowKey = 'id',
//     dataSource,
//     onSelectChange,
//     operations = [],
//     selectedKeys = emptyKeys,
//     operationRender = defaultOperationRender,
//   } = props;

//   const [{ checkAll, indeterminate }, updater, update] = useUpdate({
//     checkAll: false,
//     indeterminate: false,
//   });
//   const getKey = React.useCallback((item: T) => (typeof rowKey === 'function' ? rowKey(item) : item[rowKey]), [rowKey]);

//   React.useEffect(() => {
//     const allKeys: React.Key[] = map(dataSource, getKey);
//     const curChosenKeys = intersection(allKeys, selectedKeys);
//     update({
//       checkAll: curChosenKeys.length === allKeys.length && allKeys.length > 0,
//       indeterminate: curChosenKeys.length !== 0 && curChosenKeys.length < allKeys.length,
//     });
//   }, [update, dataSource, rowKey, selectedKeys, getKey]);

//   const onCheckAllChange = () => {
//     const allKeys: React.Key[] = map(dataSource, getKey);
//     if (checkAll) {
//       onSelectChange(difference(selectedKeys, allKeys));
//     } else {
//       onSelectChange(uniq(selectedKeys.concat(allKeys)));
//     }
//   };

//   const visibleOperations = operations.filter((op) =>
//     typeof op.isVisible === 'function' ? op.isVisible(selectedKeys) : true,
//   );
//   const dropdownMenu = (
//     <Menu
//       theme="dark"
//       selectable
//       onSelect={({ key }) => {
//         const op = visibleOperations.find((a) => a.key === key);
//         if (op) {
//           const result = op.onClick(selectedKeys);
//           if (isPromise(result)) {
//             result.then(() => onSelectChange([]));
//           } else {
//             onSelectChange([]);
//           }
//         }
//       }}
//     >
//       {map(visibleOperations, (opItem) => {
//         return (
//           <Menu.Item key={opItem.key} disabled={opItem.disabled}>
//             {operationRender(opItem)}
//           </Menu.Item>
//         );
//       })}
//     </Menu>
//   );

//   return (
//     <div className="flex items-center">
//       <Checkbox className="ml-0.5 mr-2" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll} />
//       <span className="mr-2">
//         {`${i18n.t('selected {name}', {
//           name: `${selectedKeys?.length || 0} ${i18n.t('common:items')}`,
//         })}`}
//       </span>
//       {visibleOperations.length > 1 ? (
//         <Dropdown
//           overlay={dropdownMenu}
//           overlayClassName="dice-cp-table-batch-operations"
//           getPopupContainer={(triggerNode) => triggerNode.parentElement as HTMLElement}
//         >
//           <Button className="flex items-center bg-default-06 border-transparent text-default-8">
//             {i18n.t('batch operate')}
//             <ErdaIcon size="18" type="caret-down" className="ml-1 text-default-4" />
//           </Button>
//         </Dropdown>
//       ) : visibleOperations.length === 1 ? (
//         <Button
//           className="flex items-center bg-default-06 border-transparent text-default-8"
//           disabled={visibleOperations[0].disabled}
//           onClick={() => {
//             const result = visibleOperations[0].onClick(selectedKeys);
//             if (isPromise(result)) {
//               result.then(() => onSelectChange([]));
//             } else {
//               onSelectChange([]);
//             }
//           }}
//         >
//           {visibleOperations[0].name}
//         </Button>
//       ) : null}
//     </div>
//   );
// }

// export default BatchOperation;
