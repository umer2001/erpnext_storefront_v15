import { t } from "i18next";
import * as yup from "yup";

export const couponCodeSchema = yup.object().shape({
  applied_code: yup.string().min(4, t("Coupon code is too short or empty")),
  applied_referral_sales_partner: yup.string(),
});
