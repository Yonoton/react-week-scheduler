import { Locale } from 'date-fns';
declare type Options = {
    dateRange: [Date, Date];
    locale: Locale;
    template?: string;
    template2?: string;
    includeDayIfSame?: boolean;
};
export declare const getFormattedComponentsForDateRange: ({ dateRange, locale, template, template2, includeDayIfSame, }: Options) => string[];
export declare const getTextForDateRange: (options: Options) => string;
export {};
//# sourceMappingURL=getTextForDateRange.d.ts.map