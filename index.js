/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (props, arr) =>
  arr.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).filter(([key]) => !props.includes(key))
    )
  );
exports.excludeByProperty = (prop, arr) =>
  arr.filter((obj) => !obj.hasOwnProperty(prop));
exports.sumDeep = (arr) =>
  arr.map((obj) =>
    Object.fromEntries(
      Object.entries(obj).map(([objKey, objValue]) => [
        objKey,
        objValue.reduce(
          (prevValue, nextValue) =>
            prevValue +
            Object.values(nextValue).reduce((prev, next) => prev + next),
          0
        ),
      ])
    )
  );
exports.applyStatusColor = (colors, arr) => {
  const colorArr = Object.entries(colors);
  return arr
    .map((item) => ({
      ...item,
      ...Object.fromEntries(
        Object.entries(item).map(([key, value]) => [
          "color",
          ...colorArr
            .filter(([, coloredStatus]) => coloredStatus.includes(value))
            .flat(),
        ])
      ),
    }))
    .filter(({ color }) => !!color);
};
exports.createGreeting = (_, say) => (to) => `${say} ${to}`;
exports.setDefaults = (defaults) => (user) => ({ ...defaults, ...user });
exports.fetchUserByNameAndUsersCompany = async (
  userName,
  { fetchUsers, fetchStatus, fetchCompanyById }
) => {
  const users = await fetchUsers();
  const [userInfo = {}] = users.filter(({ name }) => name === userName);
  const { companyId } = userInfo;
  const company = await fetchCompanyById(companyId);
  const status = await fetchStatus();
  return {
    user: userInfo,
    company,
    status,
  };
};
