cargo upgrade
cargo update
pnpm up -r

for f in goprojects/*
    do (cd $f && go get -u)
done