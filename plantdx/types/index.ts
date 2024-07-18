import { SVGProps } from "react";
import { Database } from "./schema";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UseQueryResult<T1, T2> = {
  onSuccess?: (response: T1) => void;
  onError?: (error: T2) => void;
};

export type UseMutationResult<T1, T2> = {
  onSuccess?: (response: T1) => void;
  onError?: (error: T2) => void;
};

export type User = Database["public"]["Tables"]["user"];
