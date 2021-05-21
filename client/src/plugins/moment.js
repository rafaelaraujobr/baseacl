import moment from "moment";
import "moment/locale/pt-br";

const install = (Vue) => {
    moment().locale("pt-br");
    moment.updateLocale("pt-br", { invalidDate: "Não Informado" });
    Vue.prototype.moment = moment;
};

export default { install };