sea generate entity \
    --with-copy-enums \
    --with-serde both \
    --serde-skip-hidden-column \
    --model-extra-attributes 'api_macros::gen_schemas(id_descriptor = "")' \
    --enum-extra-attributes 'api_macros::gen_schemas' \
    -u postgres://postgres:postgres@localhost/athena_db \
    -o crates/entity/src/generated