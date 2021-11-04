/**
 * Функция возвращает массив из роутов, исключая ненужные
 * @param {*} routes Роуты
 * @param {*} routeName Имя роута
 * @param {*} includeRoute Оставить ли роут. false - роут удалён
 * @returns
 */
const getRoutesWithoutName = (routes, routeName, includeRoute) => {
  return includeRoute
    ? routes
    : routes.filter(({ name }) => name !== routeName);
};

export { getRoutesWithoutName };
