package com.habitxp.backend.model;

public enum FrequencyOrder {
    DAILY(1), WEEKLY(2), MONTHLY(3);

    private final int order;

    FrequencyOrder(int order) {
        this.order = order;
    }

    public int getOrder() {
        return order;
    }
}
