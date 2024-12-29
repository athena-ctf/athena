sea generate entity \
    --with-copy-enums \
    --with-serde both \
    --serde-skip-hidden-column \
    --model-extra-attributes 'api_macros::gen_schemas(id_descriptor = "")' \
    --enum-extra-derives "utoipa::ToSchema" \
    --enum-extra-attributes 'serde(rename_all = "snake_case")' \
    -u postgres://postgres:postgres@localhost/athena_db \
    -o crates/entity/src/generated