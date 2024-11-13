sea generate entity \
    --lib \
    --with-copy-enums \
    --with-serde both \
    --serde-skip-hidden-column \
    --model-extra-derives "utoipa::ToSchema","oxide_macros::Details" \
    --model-extra-attributes "schema(as = Model)" \
    --enum-extra-derives "utoipa::ToSchema" \
    --enum-extra-attributes 'serde(rename_all = "snake_case")' \
    -u postgres://postgres:postgres@localhost/athena_db \
    -o crates/entity/src